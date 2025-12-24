import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Clock,
  Calendar,
  PieChart,
  Activity
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  PieChart as RePieChart,
  Pie,
} from "recharts";

const monthlyPnL = [
  { month: "Янв", pnl: 850, trades: 24 },
  { month: "Фев", pnl: -150, trades: 18 },
  { month: "Мар", pnl: 1200, trades: 32 },
  { month: "Апр", pnl: 600, trades: 21 },
  { month: "Май", pnl: 450, trades: 19 },
  { month: "Июн", pnl: -200, trades: 15 },
  { month: "Июл", pnl: 1400, trades: 28 },
  { month: "Авг", pnl: 1100, trades: 25 },
];

const winRateByDay = [
  { day: "Пн", winRate: 72, trades: 45 },
  { day: "Вт", winRate: 68, trades: 52 },
  { day: "Ср", winRate: 75, trades: 48 },
  { day: "Чт", winRate: 62, trades: 41 },
  { day: "Пт", winRate: 55, trades: 38 },
];

const winRateBySession = [
  { name: "Азия", value: 65, color: "hsl(195 100% 55%)" },
  { name: "Лондон", value: 78, color: "hsl(155 100% 50%)" },
  { name: "Нью-Йорк", value: 71, color: "hsl(40 100% 50%)" },
];

const heatmapData = [
  { hour: "00", mon: 0, tue: 1, wed: -1, thu: 0, fri: 2 },
  { hour: "04", mon: 2, tue: 0, wed: 1, thu: -2, fri: 0 },
  { hour: "08", mon: 3, tue: 2, wed: 4, thu: 1, fri: -1 },
  { hour: "12", mon: 2, tue: 3, wed: 2, thu: 3, fri: 1 },
  { hour: "16", mon: 1, tue: -1, wed: 2, thu: 2, fri: -2 },
  { hour: "20", mon: -1, tue: 0, wed: -1, thu: 1, fri: 0 },
];

const Analytics = () => {
  const [period, setPeriod] = useState("month");
  const [activeTab, setActiveTab] = useState<"performance" | "heatmap" | "whatif">("performance");

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-hud-cyan" />
              Аналитика
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Детальный анализ торговой статистики</p>
          </div>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Неделя</SelectItem>
                <SelectItem value="month">Месяц</SelectItem>
                <SelectItem value="quarter">Квартал</SelectItem>
                <SelectItem value="year">Год</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          {[
            { id: "performance", label: "Показатели", icon: Activity },
            { id: "heatmap", label: "Тепловая карта", icon: PieChart },
            { id: "whatif", label: "Что если", icon: Target },
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "hud" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Performance View */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Всего сделок", value: "182", change: "+24", icon: Activity },
                { label: "Винрейт", value: "68%", change: "+3%", icon: Target },
                { label: "Лучшая серия", value: "12", icon: TrendingUp },
                { label: "Худшая серия", value: "4", icon: TrendingDown },
              ].map((metric, i) => (
                <Card key={i} variant="panel">
                  <CardContent className="p-4">
                    <metric.icon className="h-4 w-4 text-primary mb-2" />
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-mono font-bold text-foreground">{metric.value}</p>
                    {metric.change && (
                      <Badge variant="hud" className="mt-2">{metric.change}</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly P&L */}
              <Card variant="hud">
                <CardHeader>
                  <CardTitle>P&L по месяцам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyPnL}>
                        <XAxis 
                          dataKey="month" 
                          stroke="hsl(210 20% 55%)"
                          fontSize={10}
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="hsl(210 20% 55%)"
                          fontSize={10}
                          tickLine={false}
                          tickFormatter={(v) => `$${v}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(220 25% 7%)",
                            border: "1px solid hsl(155 100% 50% / 0.3)",
                            borderRadius: "4px",
                            fontFamily: "JetBrains Mono",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                          {monthlyPnL.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.pnl >= 0 ? "hsl(155 100% 50%)" : "hsl(345 100% 60%)"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Win Rate by Day */}
              <Card variant="hudCyan">
                <CardHeader>
                  <CardTitle>Винрейт по дням</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={winRateByDay}>
                        <defs>
                          <linearGradient id="winrateGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(195 100% 55%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(195 100% 55%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="day" 
                          stroke="hsl(210 20% 55%)"
                          fontSize={10}
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="hsl(210 20% 55%)"
                          fontSize={10}
                          tickLine={false}
                          tickFormatter={(v) => `${v}%`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(220 25% 7%)",
                            border: "1px solid hsl(195 100% 55% / 0.3)",
                            borderRadius: "4px",
                            fontFamily: "JetBrains Mono",
                            fontSize: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="winRate"
                          stroke="hsl(195 100% 55%)"
                          strokeWidth={2}
                          fill="url(#winrateGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Win Rate by Session */}
            <Card variant="panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-hud-amber" />
                  Винрейт по сессиям
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {winRateBySession.map((session, i) => (
                    <div key={i} className="p-4 rounded bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-sm text-foreground">{session.name}</span>
                        <span className="font-mono text-xl font-bold" style={{ color: session.color }}>
                          {session.value}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${session.value}%`, backgroundColor: session.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Heatmap View */}
        {activeTab === "heatmap" && (
          <Card variant="hud">
            <CardHeader>
              <CardTitle>Тепловая карта P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2 font-mono text-xs text-muted-foreground">Время</th>
                      {["Пн", "Вт", "Ср", "Чт", "Пт"].map(day => (
                        <th key={day} className="p-2 font-mono text-xs text-muted-foreground">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.map((row, i) => (
                      <tr key={i}>
                        <td className="p-2 font-mono text-xs text-muted-foreground">{row.hour}:00</td>
                        {["mon", "tue", "wed", "thu", "fri"].map(day => {
                          const value = row[day as keyof typeof row] as number;
                          const getColor = (v: number) => {
                            if (v > 2) return "bg-success/80";
                            if (v > 0) return "bg-success/40";
                            if (v === 0) return "bg-muted";
                            if (v > -2) return "bg-destructive/40";
                            return "bg-destructive/80";
                          };
                          return (
                            <td key={day} className="p-1">
                              <div className={`w-12 h-10 rounded ${getColor(value)} flex items-center justify-center font-mono text-xs`}>
                                {value > 0 ? `+${value}` : value}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* What If View */}
        {activeTab === "whatif" && (
          <Card variant="hudCyan">
            <CardHeader>
              <CardTitle>"Что если" анализ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Посмотрите, как изменились бы ваши результаты при других условиях.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-muted/30 border border-border">
                    <p className="font-mono text-xs text-muted-foreground mb-2">
                      Если бы не было сделок с revenge trading:
                    </p>
                    <p className="font-mono text-2xl font-bold text-success">+$2,450</p>
                    <p className="text-xs text-muted-foreground">дополнительного профита</p>
                  </div>
                  <div className="p-4 rounded bg-muted/30 border border-border">
                    <p className="font-mono text-xs text-muted-foreground mb-2">
                      Если бы всегда использовался SL:
                    </p>
                    <p className="font-mono text-2xl font-bold text-success">-$850</p>
                    <p className="text-xs text-muted-foreground">сохраненного капитала</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Analytics;
