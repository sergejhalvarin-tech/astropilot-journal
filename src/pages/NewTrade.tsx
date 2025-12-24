import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  PlusCircle, 
  Calculator, 
  Camera, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Crosshair
} from "lucide-react";

const tradingPairs = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD",
  "EUR/GBP", "EUR/JPY", "GBP/JPY", "XAU/USD", "BTC/USD", "ETH/USD"
];

const errorTags = [
  { id: "early_entry", name: "Ранний вход", color: "hudAmber" as const },
  { id: "no_sl", name: "Нет SL", color: "hudRed" as const },
  { id: "overtrading", name: "Пересиживание", color: "hudAmber" as const },
  { id: "emotional", name: "Эмоции", color: "hudRed" as const },
  { id: "fomo", name: "FOMO", color: "hudAmber" as const },
  { id: "revenge", name: "Месть", color: "hudRed" as const },
];

const NewTrade = () => {
  const [tradeType, setTradeType] = useState<"long" | "short">("long");
  const [selectedErrors, setSelectedErrors] = useState<string[]>([]);
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [riskPercent] = useState(1);

  const toggleError = (id: string) => {
    setSelectedErrors(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  // Calculate risk/reward
  const calculateRR = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);
    
    if (entry && sl && tp) {
      const risk = Math.abs(entry - sl);
      const reward = Math.abs(tp - entry);
      return (reward / risk).toFixed(2);
    }
    return "—";
  };

  // Calculate potential loss
  const calculateRisk = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const size = parseFloat(positionSize);
    
    if (entry && sl && size) {
      const pips = Math.abs(entry - sl);
      return (pips * size).toFixed(2);
    }
    return "—";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Crosshair className="h-5 w-5 text-primary" />
              Новая сделка
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Регистрация торговой позиции</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trade Form - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trading View Embed Placeholder */}
            <Card variant="panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-hud-cyan" />
                  TradingView Chart
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-muted to-background rounded border border-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-hud-cyan/10 border border-hud-cyan/30 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-hud-cyan" />
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">TradingView виджет</p>
                    <p className="font-mono text-xs text-muted-foreground/60 mt-1">Вставьте ссылку на график</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trade Details */}
            <Card variant="hud">
              <CardHeader>
                <CardTitle>Параметры сделки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Trade Direction */}
                <div className="flex gap-4">
                  <Button
                    variant={tradeType === "long" ? "hud" : "ghost"}
                    className="flex-1"
                    onClick={() => setTradeType("long")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    LONG
                  </Button>
                  <Button
                    variant={tradeType === "short" ? "hudRed" : "ghost"}
                    className="flex-1"
                    onClick={() => setTradeType("short")}
                  >
                    <TrendingDown className="h-4 w-4 mr-2" />
                    SHORT
                  </Button>
                </div>

                {/* Trading Pair & Position Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Торговая пара
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите пару" />
                      </SelectTrigger>
                      <SelectContent>
                        {tradingPairs.map(pair => (
                          <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Размер позиции
                    </label>
                    <Input 
                      type="number" 
                      placeholder="0.01 лот" 
                      value={positionSize}
                      onChange={(e) => setPositionSize(e.target.value)}
                    />
                  </div>
                </div>

                {/* Entry / SL / TP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Цена входа
                    </label>
                    <Input 
                      type="number" 
                      placeholder="1.0850" 
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-hud-red flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Stop Loss
                    </label>
                    <Input 
                      type="number" 
                      placeholder="1.0800" 
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      className="border-hud-red/30 focus:border-hud-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-success flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Take Profit
                    </label>
                    <Input 
                      type="number" 
                      placeholder="1.0950" 
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                      className="border-success/30 focus:border-success"
                    />
                  </div>
                </div>

                {/* Screenshot Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Скриншот сетапа
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-mono text-sm text-muted-foreground">
                      Перетащите изображение или нажмите для загрузки
                    </p>
                    <p className="font-mono text-xs text-muted-foreground/60 mt-1">
                      PNG, JPG до 10MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Tags */}
            <Card variant="hudAmber">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-hud-amber" />
                  Ошибки и теги
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {errorTags.map(tag => (
                    <Badge
                      key={tag.id}
                      variant={selectedErrors.includes(tag.id) ? tag.color : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => toggleError(tag.id)}
                    >
                      {selectedErrors.includes(tag.id) && "✓ "}
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Calculator - 1 column */}
          <div className="space-y-6">
            <Card variant="hudCyan">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-hud-cyan" />
                  Калькулятор риска
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Risk/Reward Display */}
                <div className="p-4 rounded bg-muted/30 border border-border">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Риск/Награда
                  </p>
                  <p className="text-3xl font-mono font-bold text-hud-cyan">
                    1:{calculateRR()}
                  </p>
                </div>

                {/* Risk Amount */}
                <div className="p-4 rounded bg-muted/30 border border-border">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Риск в $
                  </p>
                  <p className="text-2xl font-mono font-bold text-hud-red">
                    ${calculateRisk()}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    {riskPercent}% от депозита
                  </p>
                </div>

                {/* Potential Profit */}
                <div className="p-4 rounded bg-muted/30 border border-border">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Потенциальный профит
                  </p>
                  <p className="text-2xl font-mono font-bold text-success">
                    ${(parseFloat(calculateRisk()) * parseFloat(calculateRR()) || 0).toFixed(2)}
                  </p>
                </div>

                {/* Live Price */}
                <div className="p-4 rounded bg-primary/10 border border-primary/30">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Текущая цена
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <p className="text-xl font-mono font-bold text-primary">
                      1.0852
                    </p>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    EUR/USD • Обновлено 2с назад
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button variant="default" size="lg" className="w-full">
              <PlusCircle className="h-5 w-5 mr-2" />
              Открыть позицию
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewTrade;
