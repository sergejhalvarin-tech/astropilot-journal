import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Crosshair,
  Target,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import instagramBg from "@/assets/instagram-bg.jfif";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    callsign: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Ошибка",
        description: "Необходимо принять условия использования",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Регистрация успешна",
      description: "Добро пожаловать в систему, пилот!",
    });
    
    setIsLoading(false);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Main animated background */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "hsl(var(--background))",
          }}
        >
          <img 
            src={instagramBg} 
            alt="Background"
            className="max-w-full max-h-full w-auto h-auto object-contain"
            style={{
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        
        {/* Glow sweep effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-y-0 w-1/2 animate-glow-sweep"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--hud-cyan) / 0.1), transparent)",
            }}
          />
        </div>
        
        {/* Subtle vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.3) 100%)",
          }}
        />
        
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(var(--hud-green) / 0.15) 2px,
              hsl(var(--hud-green) / 0.15) 4px
            )`,
          }}
        />
        
        {/* Animated glow corners */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-hud-cyan/10 rounded-full blur-[100px] animate-pulse-soft" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: "2s" }} />
      </div>

      {/* HUD Corner Elements */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2">
          <Crosshair className="h-5 w-5 text-primary animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            PILOT REGISTRATION
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider">
            СИСТЕМА АКТИВНА
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <div className="font-mono text-[10px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <Target className="h-3 w-3 text-hud-cyan" />
            <span>SECURE CONNECTION</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-hud-green" />
            <span>ENCRYPTED CHANNEL</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <div className="font-mono text-[10px] text-muted-foreground text-right">
          <div>TRADING JOURNAL v1.0</div>
          <div className="text-primary">ELITE EDITION</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Registration Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/30 via-hud-cyan/20 to-primary/30 blur-xl opacity-60 animate-pulse-soft" />
            
            {/* Glass card - less transparent */}
            <div className="relative rounded-lg border border-primary/40 bg-background/60 p-8 shadow-[0_0_60px_hsl(var(--hud-green)/0.2)]">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary" />

              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-primary/30 animate-pulse" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background/30">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>
                <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground mb-2 drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                  РЕГИСТРАЦИЯ
                </h1>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Создайте аккаунт пилота
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Callsign Field */}
                <div className="space-y-2">
                  <Label htmlFor="callsign" className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Позывной
                  </Label>
                  <div className="relative">
                    <Input
                      id="callsign"
                      name="callsign"
                      type="text"
                      placeholder="Введите позывной..."
                      value={formData.callsign}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-background/30 border-primary/30"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="pilot@squadron.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-background/30 border-primary/30"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Lock className="h-3 w-3" />
                    Пароль
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="pl-10 pr-10 bg-background/30 border-primary/30"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Lock className="h-3 w-3" />
                    Подтвердите пароль
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="pl-10 pr-10 bg-background/30 border-primary/30"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeTerms: checked === true }))
                    }
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor="agreeTerms"
                    className="font-mono text-xs text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    Я принимаю{" "}
                    <span className="text-primary hover:underline cursor-pointer">
                      условия использования
                    </span>{" "}
                    и{" "}
                    <span className="text-primary hover:underline cursor-pointer">
                      политику конфиденциальности
                    </span>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full relative overflow-hidden group"
                  variant="hud"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[shimmer_1.5s_infinite]" />
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        ИНИЦИАЛИЗАЦИЯ...
                      </span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      СОЗДАТЬ АККАУНТ
                    </>
                  )}
                </Button>
              </form>

              {/* Footer Links */}
              <div className="mt-6 text-center">
                <p className="font-mono text-xs text-muted-foreground">
                  Уже есть аккаунт?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 transition-colors hover:underline"
                  >
                    Войти
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-transparent px-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    или
                  </span>
                </div>
              </div>

              {/* Alternative Actions */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 font-mono text-xs bg-background/20 border-primary/30 hover:bg-background/40"
                  onClick={() => navigate("/")}
                >
                  Обзор системы
                </Button>
                <Button
                  type="button"
                  variant="hudCyan"
                  className="flex-1 font-mono text-xs"
                  onClick={() => navigate("/login")}
                >
                  Вход
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}