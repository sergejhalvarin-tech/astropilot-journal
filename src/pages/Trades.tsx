import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  List, 
  Search, 
  Filter, 
  Image as ImageIcon,
  TrendingUp,
  TrendingDown,
  X,
  Eye
} from "lucide-react";

const trades = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:32",
    pair: "EUR/USD",
    type: "LONG",
    entry: 1.0852,
    exit: 1.0920,
    sl: 1.0820,
    tp: 1.0920,
    pnl: 680,
    rr: "1:2.1",
    errors: ["Ранний вход"],
    screenshot: true,
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "14:15",
    pair: "GBP/JPY",
    type: "SHORT",
    entry: 185.420,
    exit: 185.650,
    sl: 185.700,
    tp: 185.100,
    pnl: -230,
    rr: "1:1.5",
    errors: ["Пересиживание", "Нет SL"],
    screenshot: true,
  },
  {
    id: 3,
    date: "2024-01-14",
    time: "16:45",
    pair: "XAU/USD",
    type: "LONG",
    entry: 2032.50,
    exit: 2045.80,
    sl: 2025.00,
    tp: 2050.00,
    pnl: 1330,
    rr: "1:2.8",
    errors: [],
    screenshot: true,
  },
  {
    id: 4,
    date: "2024-01-14",
    time: "11:20",
    pair: "USD/CAD",
    type: "SHORT",
    entry: 1.3450,
    exit: 1.3420,
    sl: 1.3480,
    tp: 1.3400,
    pnl: 300,
    rr: "1:1.7",
    errors: [],
    screenshot: false,
  },
  {
    id: 5,
    date: "2024-01-13",
    time: "08:55",
    pair: "BTC/USD",
    type: "LONG",
    entry: 42500,
    exit: 42100,
    sl: 42000,
    tp: 43500,
    pnl: -400,
    rr: "1:2",
    errors: ["FOMO", "Эмоции"],
    screenshot: true,
  },
];

const Trades = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState<typeof trades[0] | null>(null);

  const filteredTrades = trades.filter(trade => 
    trade.pair.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              Список сделок
            </h1>
            <p className="text-xs text-muted-foreground mt-1">История всех торговых операций</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск по паре..."
                className="pl-9 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Trades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrades.map((trade) => (
            <Card 
              key={trade.id} 
              variant={trade.pnl >= 0 ? "hud" : "hudAmber"}
              className="cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => setSelectedTrade(trade)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={trade.type === "LONG" ? "hud" : "hudRed"}>
                      {trade.type === "LONG" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {trade.type}
                    </Badge>
                    <CardTitle className="text-base">{trade.pair}</CardTitle>
                  </div>
                  {trade.screenshot && (
                    <div className="p-1.5 rounded bg-muted/50">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Дата:</span>
                    <span className="ml-2 font-mono text-foreground">{trade.date}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Время:</span>
                    <span className="ml-2 font-mono text-foreground">{trade.time}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Вход:</span>
                    <span className="ml-2 font-mono text-foreground">{trade.entry}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Выход:</span>
                    <span className="ml-2 font-mono text-foreground">{trade.exit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">R:R</span>
                    <span className="font-mono text-sm text-hud-cyan">{trade.rr}</span>
                  </div>
                  <span className={`font-mono text-lg font-bold ${trade.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(0)}$
                  </span>
                </div>

                {trade.errors.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {trade.errors.map((error, i) => (
                      <Badge key={i} variant="hudAmber" className="text-[9px]">
                        {error}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Screenshot Modal */}
      {selectedTrade && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedTrade(null)}
        >
          <Card variant="panel" className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant={selectedTrade.type === "LONG" ? "hud" : "hudRed"}>
                  {selectedTrade.type}
                </Badge>
                <CardTitle>{selectedTrade.pair}</CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedTrade(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Screenshot Placeholder */}
              <div className="aspect-video bg-muted rounded border border-border flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="font-mono text-sm text-muted-foreground">Скриншот сетапа</p>
                </div>
              </div>

              {/* Trade Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded bg-muted/30 border border-border">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">Вход</p>
                  <p className="font-mono font-semibold text-foreground">{selectedTrade.entry}</p>
                </div>
                <div className="p-3 rounded bg-muted/30 border border-border">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">Выход</p>
                  <p className="font-mono font-semibold text-foreground">{selectedTrade.exit}</p>
                </div>
                <div className="p-3 rounded bg-destructive/10 border border-destructive/30">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">SL</p>
                  <p className="font-mono font-semibold text-destructive">{selectedTrade.sl}</p>
                </div>
                <div className="p-3 rounded bg-success/10 border border-success/30">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">TP</p>
                  <p className="font-mono font-semibold text-success">{selectedTrade.tp}</p>
                </div>
              </div>

              {/* P&L */}
              <div className="flex items-center justify-between p-4 rounded bg-muted/30 border border-border">
                <span className="font-mono text-sm text-muted-foreground">Результат</span>
                <span className={`font-mono text-2xl font-bold ${selectedTrade.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {selectedTrade.pnl >= 0 ? '+' : ''}{selectedTrade.pnl.toFixed(0)}$
                </span>
              </div>

              {/* Errors */}
              {selectedTrade.errors.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase text-muted-foreground">Ошибки:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrade.errors.map((error, i) => (
                      <Badge key={i} variant="hudAmber">{error}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </MainLayout>
  );
};

export default Trades;
