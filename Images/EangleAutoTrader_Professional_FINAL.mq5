
//+------------------------------------------------------------------+
//|                 EangleAutoTrader_Professional.mq5                |
//|      Multi-filter Automated Trading EA for MetaTrader 5          |
//|      Designed for structured, risk-controlled trading            |
//+------------------------------------------------------------------+
#property copyright "Eangle Auto Trading"
#property version   "5.00"
#property strict

#include <Trade/Trade.mqh>
CTrade trade;

// ---------------- Inputs ----------------

// Risk
input double RiskPercent = 1.0;
input int StopLossPoints = 300;
input int TakeProfitPoints = 600;

// Protection
input int BreakEvenPoints = 200;
input int TrailingStopPoints = 150;

// Trend
input int FastMAPeriod = 20;
input int SlowMAPeriod = 50;

// Higher timeframe confirmation
input int HTFFast = 50;
input int HTFSlow = 200;

// Volatility filter
input int ATRPeriod = 14;
input double ATRMinimum = 2.0;

// Spread filter
input int MaxSpreadPoints = 50;

// Session filter
input int LondonStart = 10;
input int LondonEnd = 13;
input int NewYorkStart = 15;
input int NewYorkEnd = 18;

// Trade control
input int MaxTradesPerDay = 2;
input double DailyProfitTargetPercent = 3.0;

// ---------------- Globals ----------------

datetime lastTradeDay;
int tradesToday = 0;

//+------------------------------------------------------------------+
// Initialization
//+------------------------------------------------------------------+
int OnInit()
{
   lastTradeDay = TimeDay(TimeCurrent());
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
// Risk lot calculation
//+------------------------------------------------------------------+
double CalculateLot()
{
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskMoney = balance * (RiskPercent/100.0);
   double lot = riskMoney / 1000.0;

   if(lot < 0.01)
      lot = 0.01;

   return NormalizeDouble(lot,2);
}

//+------------------------------------------------------------------+
// Spread filter
//+------------------------------------------------------------------+
bool SpreadOK()
{
   double spread = (SymbolInfoDouble(_Symbol,SYMBOL_ASK)-SymbolInfoDouble(_Symbol,SYMBOL_BID))/_Point;
   if(spread > MaxSpreadPoints)
      return false;
   return true;
}

//+------------------------------------------------------------------+
// Session filter
//+------------------------------------------------------------------+
bool SessionAllowed()
{
   int hour = TimeHour(TimeCurrent());

   if(hour >= LondonStart && hour <= LondonEnd)
      return true;

   if(hour >= NewYorkStart && hour <= NewYorkEnd)
      return true;

   return false;
}

//+------------------------------------------------------------------+
// ATR volatility filter
//+------------------------------------------------------------------+
bool VolatilityOK()
{
   double atr = iATR(_Symbol,PERIOD_M5,ATRPeriod,0);

   if(atr/_Point > ATRMinimum)
      return true;

   return false;
}

//+------------------------------------------------------------------+
// Daily profit lock
//+------------------------------------------------------------------+
double DailyProfitPercent()
{
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double equity = AccountInfoDouble(ACCOUNT_EQUITY);

   double profit = equity - balance;

   return (profit/balance)*100;
}

//+------------------------------------------------------------------+
// Position exists
//+------------------------------------------------------------------+
bool PositionExists()
{
   for(int i=0;i<PositionsTotal();i++)
   {
      ulong ticket = PositionGetTicket(i);

      if(PositionSelectByTicket(ticket))
      {
         if(PositionGetString(POSITION_SYMBOL)==_Symbol)
            return true;
      }
   }

   return false;
}

//+------------------------------------------------------------------+
// Lower timeframe trend
//+------------------------------------------------------------------+
string GetSignal()
{
   double fast = iMA(_Symbol,PERIOD_M5,FastMAPeriod,0,MODE_SMA,PRICE_CLOSE,0);
   double slow = iMA(_Symbol,PERIOD_M5,SlowMAPeriod,0,MODE_SMA,PRICE_CLOSE,0);

   if(fast > slow)
      return "BUY";

   if(fast < slow)
      return "SELL";

   return "NONE";
}

//+------------------------------------------------------------------+
// Higher timeframe confirmation
//+------------------------------------------------------------------+
string GetHigherTrend()
{
   double fast = iMA(_Symbol,PERIOD_H1,HTFFast,0,MODE_SMA,PRICE_CLOSE,0);
   double slow = iMA(_Symbol,PERIOD_H1,HTFSlow,0,MODE_SMA,PRICE_CLOSE,0);

   if(fast > slow)
      return "BUY";

   if(fast < slow)
      return "SELL";

   return "NONE";
}

//+------------------------------------------------------------------+
// Open trade
//+------------------------------------------------------------------+
void OpenTrade(string signal)
{
   double lot = CalculateLot();
   double price, sl, tp;

   if(signal=="BUY")
   {
      price = SymbolInfoDouble(_Symbol,SYMBOL_ASK);
      sl = price - StopLossPoints*_Point;
      tp = price + TakeProfitPoints*_Point;

      trade.Buy(lot,_Symbol,price,sl,tp,"Eangle BUY");
   }

   if(signal=="SELL")
   {
      price = SymbolInfoDouble(_Symbol,SYMBOL_BID);
      sl = price + StopLossPoints*_Point;
      tp = price - TakeProfitPoints*_Point;

      trade.Sell(lot,_Symbol,price,sl,tp,"Eangle SELL");
   }
}

//+------------------------------------------------------------------+
// Manage break-even & trailing
//+------------------------------------------------------------------+
void ManagePositions()
{
   for(int i=0;i<PositionsTotal();i++)
   {
      ulong ticket = PositionGetTicket(i);

      if(!PositionSelectByTicket(ticket))
         continue;

      if(PositionGetString(POSITION_SYMBOL)!=_Symbol)
         continue;

      double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
      double sl = PositionGetDouble(POSITION_SL);
      double tp = PositionGetDouble(POSITION_TP);

      double bid = SymbolInfoDouble(_Symbol,SYMBOL_BID);
      double ask = SymbolInfoDouble(_Symbol,SYMBOL_ASK);

      int type = PositionGetInteger(POSITION_TYPE);

      if(type==POSITION_TYPE_BUY)
      {
         double profit = (bid-openPrice)/_Point;

         if(profit>BreakEvenPoints && sl<openPrice)
            trade.PositionModify(ticket,openPrice,tp);

         double newSL = bid - TrailingStopPoints*_Point;

         if(newSL>sl)
            trade.PositionModify(ticket,newSL,tp);
      }

      if(type==POSITION_TYPE_SELL)
      {
         double profit = (openPrice-ask)/_Point;

         if(profit>BreakEvenPoints && (sl>openPrice || sl==0))
            trade.PositionModify(ticket,openPrice,tp);

         double newSL = ask + TrailingStopPoints*_Point;

         if(newSL<sl || sl==0)
            trade.PositionModify(ticket,newSL,tp);
      }
   }
}

//+------------------------------------------------------------------+
// Main logic
//+------------------------------------------------------------------+
void OnTick()
{
   int today = TimeDay(TimeCurrent());

   if(today != lastTradeDay)
   {
      tradesToday = 0;
      lastTradeDay = today;
   }

   ManagePositions();

   if(DailyProfitPercent() >= DailyProfitTargetPercent)
      return;

   if(tradesToday >= MaxTradesPerDay)
      return;

   if(!SessionAllowed())
      return;

   if(!SpreadOK())
      return;

   if(!VolatilityOK())
      return;

   if(PositionExists())
      return;

   string signal = GetSignal();
   string higher = GetHigherTrend();

   if(signal==higher && (signal=="BUY" || signal=="SELL"))
   {
      OpenTrade(signal);
      tradesToday++;
   }
}
//+------------------------------------------------------------------+
