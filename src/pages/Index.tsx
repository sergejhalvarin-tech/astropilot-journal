import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, AlertTriangle, Activity, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const equityCurveData = [
  { date: "Янв", value: 10000 },
  { date: "Фев", value: 10850 },
  { date: "Мар", value: 10200 },
  { date: "Апр", value: 11500 },
  { date: "Май", value: 12100 },
  { date: "Июн", value: 11800 },
  { date: "Июл", value: 13200 },
  { date: "Авг", value: 14500 },
];

const recentTrades = [
  { id: 1, pair: "EUR/USD", type: "LONG", pnl: 245.50, rr: "1:2.5", status: "win" },
  { id: 2, pair: "GBP/JPY", type: "SHORT", pnl: -120.00, rr: "1:1.5", status: "loss" },
  { id: 3, pair: "XAU/USD", type: "LONG", pnl: 380.00, rr: "1:3", status: "win" },
  { id: 4, pair: "USD/CAD", type: "SHORT", pnl: 165.75, rr: "1:2", status: "win" },
  { id: 5, pair: "BTC/USD", type: "LONG", pnl: -85.00, rr: "1:1", status: "loss" },
];

const topMistakes = [
  { name: "Ранний вход", count: 8, percentage: 32 },
  { name: "Нет стоп-лосса", count: 5, percentage: 20 },
  { name: "Пересиживание", count: 4, percentage: 16 },
  { name: "Эмоциональная торговля", count: 4, percentage: 16 },
];

const StatCard = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  change?: string; 
  isPositive?: boolean;
  icon: React.ElementType;
}) => (
  <Card variant="hud" className="relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hud-green/50 to-transparent" />
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-mono font-bold text-foreground">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span className="text-xs font-mono">{change}</span>
            </div>
          )}
        </div>
        <div className="p-2 rounded bg-hud-green/10 border border-hud-green/20">
          <Icon className="h-5 w-5 text-hud-green" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground">
              Командный центр
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Обзор торговой активности</p>
          </div>
          <Badge variant="hud" className="animate-pulse">
            <span className="w-2 h-2 rounded-full bg-success mr-2" />
            Рынок открыт
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Баланс" 
            value="$14,500" 
            change="+12.5% за месяц" 
            isPositive={true}
            icon={DollarSign}
          />
          <StatCard 
            title="Винрейт" 
            value="68%" 
            change="+3% от прошлой недели" 
            isPositive={true}
            icon={Target}
          />
          <StatCard 
            title="Профит фактор" 
            value="2.4" 
            change="+0.3" 
            isPositive={true}
            icon={Activity}
          />
          <StatCard 
            title="Активные позиции" 
            value="2" 
            icon={TrendingUp}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equity Curve - Takes 2 columns */}
          <Card variant="hud" className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-hud-green" />
                Кривая капитала
              </CardTitle>
              <Badge variant="hudCyan">За все время</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={equityCurveData}>
                    <defs>
                      <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(155 100% 50%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(155 100% 50%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(210 20% 55%)"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(210 20% 55%)"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220 25% 7%)",
                        border: "1px solid hsl(155 100% 50% / 0.3)",
                        borderRadius: "4px",
                        fontFamily: "JetBrains Mono",
                        fontSize: "12px",
                      }}
                      labelStyle={{ color: "hsl(180 60% 90%)" }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Баланс"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(155 100% 50%)"
                      strokeWidth={2}
                      fill="url(#equityGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Mistakes */}
          <Card variant="hudAmber">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-hud-amber" />
                Основные ошибки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topMistakes.map((mistake, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-foreground">{mistake.name}</span>
                    <span className="font-mono text-hud-amber">{mistake.count}x</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-hud-amber to-hud-red"
                      style={{ width: `${mistake.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Trades */}
        <Card variant="panel">
          <CardHeader>
            <CardTitle>Последние сделки</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-4">Пара</th>
                    <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-4">Тип</th>
                    <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-4">R:R</th>
                    <th className="text-right text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-4">P&L</th>
                    <th className="text-right text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-4">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((trade) => (
                    <tr key={trade.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono font-semibold text-foreground">{trade.pair}</td>
                      <td className="p-4">
                        <Badge variant={trade.type === "LONG" ? "hud" : "hudRed"}>
                          {trade.type}
                        </Badge>
                      </td>
                      <td className="p-4 font-mono text-muted-foreground">{trade.rr}</td>
                      <td className={`p-4 text-right font-mono font-semibold ${trade.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <Badge variant={trade.status === "win" ? "success" : "destructive"}>
                          {trade.status === "win" ? "Профит" : "Убыток"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;
