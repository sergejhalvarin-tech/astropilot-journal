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
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Download,
  Upload,
  Trash2
} from "lucide-react";

const Settings = () => {
  const [riskPercent, setRiskPercent] = useState("1");
  const [dailyLimit, setDailyLimit] = useState("3");
  const [currency, setCurrency] = useState("USD");

  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            Настройки
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Конфигурация системы</p>
        </div>

        {/* Profile */}
        <Card variant="panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Профиль
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-mono font-semibold text-foreground">Трейдер</p>
                <p className="text-xs text-muted-foreground">trader@example.com</p>
                <Badge variant="hud" className="mt-1">Уровень 12 • Тактик</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Имя
                </label>
                <Input defaultValue="Трейдер" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <Input defaultValue="trader@example.com" type="email" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Management */}
        <Card variant="hud">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-hud-amber" />
              Управление рисками
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Риск на сделку (%)
                </label>
                <Input 
                  type="number" 
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  className="border-hud-amber/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Дневной лимит убытков (%)
                </label>
                <Input 
                  type="number" 
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                  className="border-hud-amber/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Валюта
                </label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="RUB">RUB (₽)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card variant="panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-hud-cyan" />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Ежедневный отчет", enabled: true },
              { label: "Еженедельный отчет", enabled: true },
              { label: "Предупреждения о лимитах", enabled: true },
              { label: "Напоминания о миссиях", enabled: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/30 border border-border">
                <span className="font-mono text-sm text-foreground">{item.label}</span>
                <Button 
                  variant={item.enabled ? "hud" : "ghost"} 
                  size="sm"
                >
                  {item.enabled ? "Вкл" : "Выкл"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card variant="panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Данные
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Download className="h-4 w-4 mr-2" />
                Экспорт данных
              </Button>
              <Button variant="outline" className="justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Импорт данных
              </Button>
              <Button variant="hudRed" className="justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Очистить все
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card variant="hudCyan">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-hud-cyan" />
              Интерфейс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Текущая тема: <span className="text-hud-cyan font-mono">Fighter Cockpit HUD</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Премиум-интерфейс в стиле кабины истребителя с HUD-элементами.
            </p>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="ghost">Отмена</Button>
          <Button variant="default">Сохранить изменения</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
