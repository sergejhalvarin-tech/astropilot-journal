import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Target,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const weeklyData = {
  week: "16-22 Янв 2024",
  trades: 18,
  winRate: 72,
  pnl: 1850,
  bestTrade: { pair: "XAU/USD", pnl: 1330 },
  worstTrade: { pair: "GBP/JPY", pnl: -230 },
  topError: "Ранний вход (4 раза)",
  avgRR: 2.1,
  improvement: "Улучшение дисциплины на 15%",
};

const dailyBreakdown = [
  { day: "Пн", trades: 3, pnl: 450, winRate: 100 },
  { day: "Вт", trades: 4, pnl: -120, winRate: 50 },
  { day: "Ср", trades: 3, pnl: 680, winRate: 67 },
  { day: "Чт", trades: 5, pnl: 540, winRate: 80 },
  { day: "Пт", trades: 3, pnl: 300, winRate: 67 },
];

const insights = [
  { type: "positive", text: "Лучший винрейт в Лондонскую сессию (85%)" },
  { type: "positive", text: "Средний R:R выше целевого (2.1 vs 2.0)" },
  { type: "warning", text: "4 сделки с тегом 'Ранний вход'" },
  { type: "warning", text: "Понедельник - слишком агрессивное начало недели" },
];

const WeeklyReport = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-hud-cyan" />
              Еженедельный отчет
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Анализ торговой недели</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Badge variant="hudCyan" className="px-4">
              <Calendar className="h-3 w-3 mr-2" />
              {weeklyData.week}
            </Badge>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="hud">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Всего сделок
              </p>
              <p className="text-3xl font-mono font-bold text-foreground">{weeklyData.trades}</p>
            </CardContent>
          </Card>
          <Card variant="hud">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Винрейт
              </p>
              <p className="text-3xl font-mono font-bold text-primary">{weeklyData.winRate}%</p>
            </CardContent>
          </Card>
          <Card variant={weeklyData.pnl >= 0 ? "hud" : "hudAmber"}>
            <CardContent className="p-4 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                P&L
              </p>
              <p className={`text-3xl font-mono font-bold ${weeklyData.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                {weeklyData.pnl >= 0 ? '+' : ''}{weeklyData.pnl}$
              </p>
            </CardContent>
          </Card>
          <Card variant="hudCyan">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Средний R:R
              </p>
              <p className="text-3xl font-mono font-bold text-hud-cyan">1:{weeklyData.avgRR}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Breakdown */}
          <div className="lg:col-span-2">
            <Card variant="panel">
              <CardHeader>
                <CardTitle>Разбивка по дням</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-mono text-[10px] uppercase text-muted-foreground">День</th>
                        <th className="text-center p-3 font-mono text-[10px] uppercase text-muted-foreground">Сделки</th>
                        <th className="text-center p-3 font-mono text-[10px] uppercase text-muted-foreground">Винрейт</th>
                        <th className="text-right p-3 font-mono text-[10px] uppercase text-muted-foreground">P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyBreakdown.map((day, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="p-3 font-mono font-semibold text-foreground">{day.day}</td>
                          <td className="p-3 text-center font-mono text-muted-foreground">{day.trades}</td>
                          <td className="p-3 text-center">
                            <Badge variant={day.winRate >= 60 ? "hud" : "hudAmber"}>
                              {day.winRate}%
                            </Badge>
                          </td>
                          <td className={`p-3 text-right font-mono font-semibold ${day.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {day.pnl >= 0 ? '+' : ''}{day.pnl}$
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Best/Worst Trades */}
          <div className="space-y-4">
            <Card variant="hud">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-success">
                  <TrendingUp className="h-4 w-4" />
                  Лучшая сделка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-lg text-foreground">{weeklyData.bestTrade.pair}</p>
                <p className="font-mono text-2xl font-bold text-success">
                  +{weeklyData.bestTrade.pnl}$
                </p>
              </CardContent>
            </Card>

            <Card variant="hudAmber">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <TrendingDown className="h-4 w-4" />
                  Худшая сделка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-lg text-foreground">{weeklyData.worstTrade.pair}</p>
                <p className="font-mono text-2xl font-bold text-destructive">
                  {weeklyData.worstTrade.pnl}$
                </p>
              </CardContent>
            </Card>

            <Card variant="hudAmber">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-hud-amber">
                  <AlertTriangle className="h-4 w-4" />
                  Главная ошибка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-foreground">{weeklyData.topError}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Insights */}
        <Card variant="panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Инсайты недели
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {insights.map((insight, i) => (
                <div 
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded border ${
                    insight.type === "positive" 
                      ? 'bg-success/5 border-success/20' 
                      : 'bg-warning/5 border-warning/20'
                  }`}
                >
                  {insight.type === "positive" ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-foreground">{insight.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Button */}
        <div className="flex justify-end">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Экспорт PDF
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default WeeklyReport;
