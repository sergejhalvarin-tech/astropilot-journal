import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  CheckCircle2,
  Circle,
  AlertTriangle,
  Target,
  Shield,
  TrendingUp,
  Brain
} from "lucide-react";

const sections = [
  {
    id: 1,
    title: "Подготовка к торговле",
    icon: Brain,
    color: "hud-cyan",
    items: [
      { text: "Проверить экономический календарь", required: true },
      { text: "Определить ключевые уровни поддержки/сопротивления", required: true },
      { text: "Просмотреть старшие таймфреймы (D1, H4)", required: true },
      { text: "Оценить общий тренд рынка", required: false },
      { text: "Проверить корреляции между парами", required: false },
    ]
  },
  {
    id: 2,
    title: "Правила входа в сделку",
    icon: Target,
    color: "hud-green",
    items: [
      { text: "Дождаться подтверждения паттерна на рабочем ТФ", required: true },
      { text: "Убедиться, что R:R не менее 1:2", required: true },
      { text: "Проверить наличие ликвидности за уровнем", required: true },
      { text: "Не входить перед важными новостями", required: true },
      { text: "Максимум 2-3 сделки в день", required: false },
    ]
  },
  {
    id: 3,
    title: "Управление рисками",
    icon: Shield,
    color: "hud-amber",
    items: [
      { text: "Риск на сделку: не более 1% депозита", required: true },
      { text: "Всегда устанавливать стоп-лосс до открытия", required: true },
      { text: "Не передвигать стоп-лосс в убыточную сторону", required: true },
      { text: "Дневной лимит убытков: 3%", required: true },
      { text: "Недельный лимит убытков: 6%", required: true },
    ]
  },
  {
    id: 4,
    title: "Выход из сделки",
    icon: TrendingUp,
    color: "hud-green",
    items: [
      { text: "Частичная фиксация на уровне 1:1", required: false },
      { text: "Перенос стопа в безубыток после 1R", required: true },
      { text: "Не жадничать - фиксировать прибыль по плану", required: true },
      { text: "Записать сделку в журнал сразу после закрытия", required: true },
    ]
  },
  {
    id: 5,
    title: "Запрещенные действия",
    icon: AlertTriangle,
    color: "hud-red",
    items: [
      { text: "Revenge trading после убытка", required: true },
      { text: "Торговля без стоп-лосса", required: true },
      { text: "Увеличение позиции на убыточной сделке", required: true },
      { text: "Торговля на эмоциях (страх, жадность)", required: true },
      { text: "Игнорирование торгового плана", required: true },
    ]
  },
];

const colorClasses = {
  "hud-cyan": "text-hud-cyan border-hud-cyan/30 bg-hud-cyan/10",
  "hud-green": "text-hud-green border-hud-green/30 bg-hud-green/10",
  "hud-amber": "text-hud-amber border-hud-amber/30 bg-hud-amber/10",
  "hud-red": "text-hud-red border-hud-red/30 bg-hud-red/10",
};

const Instructions = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Инструкции
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Торговый план и правила</p>
        </div>

        {/* Rules Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section) => {
            const colorClass = colorClasses[section.color as keyof typeof colorClasses];
            return (
              <Card key={section.id} variant="panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`p-2 rounded border ${colorClass}`}>
                      <section.icon className="h-4 w-4" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.items.map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors"
                    >
                      {item.required ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{item.text}</p>
                        {item.required && (
                          <Badge variant="hud" className="mt-1 text-[9px]">Обязательно</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Reference */}
        <Card variant="hud">
          <CardHeader>
            <CardTitle>Быстрая справка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded bg-muted/30 border border-border text-center">
                <p className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Макс. риск</p>
                <p className="font-mono text-xl font-bold text-primary">1%</p>
                <p className="text-[10px] text-muted-foreground">на сделку</p>
              </div>
              <div className="p-4 rounded bg-muted/30 border border-border text-center">
                <p className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Мин. R:R</p>
                <p className="font-mono text-xl font-bold text-hud-cyan">1:2</p>
                <p className="text-[10px] text-muted-foreground">риск/награда</p>
              </div>
              <div className="p-4 rounded bg-muted/30 border border-border text-center">
                <p className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Дневной лимит</p>
                <p className="font-mono text-xl font-bold text-hud-amber">3%</p>
                <p className="text-[10px] text-muted-foreground">убытков</p>
              </div>
              <div className="p-4 rounded bg-muted/30 border border-border text-center">
                <p className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Макс. сделок</p>
                <p className="font-mono text-xl font-bold text-foreground">3</p>
                <p className="text-[10px] text-muted-foreground">в день</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Instructions;
