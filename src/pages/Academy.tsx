import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Trophy, 
  Star, 
  Target, 
  Zap,
  Lock,
  CheckCircle2,
  Circle,
  Flame
} from "lucide-react";

const userStats = {
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  rank: "Тактик",
  streak: 7,
};

const missions = [
  {
    id: 1,
    title: "Серия из 5 прибыльных сделок",
    description: "Закройте 5 сделок подряд в плюс",
    xp: 150,
    progress: 3,
    total: 5,
    status: "active",
  },
  {
    id: 2,
    title: "Мастер риск-менеджмента",
    description: "10 сделок с соблюдением R:R не менее 1:2",
    xp: 200,
    progress: 8,
    total: 10,
    status: "active",
  },
  {
    id: 3,
    title: "Дисциплина превыше всего",
    description: "Неделя без ошибок revenge trading",
    xp: 300,
    progress: 5,
    total: 7,
    status: "active",
  },
  {
    id: 4,
    title: "Снайпер",
    description: "Вход в пределах 5 пипсов от идеального уровня",
    xp: 100,
    progress: 1,
    total: 1,
    status: "completed",
  },
];

const achievements = [
  { id: 1, name: "Первый профит", icon: Star, unlocked: true },
  { id: 2, name: "100 сделок", icon: Target, unlocked: true },
  { id: 3, name: "Недельная серия", icon: Flame, unlocked: true },
  { id: 4, name: "Профит $10K", icon: Trophy, unlocked: false },
  { id: 5, name: "Мастер анализа", icon: Zap, unlocked: false },
];

const ranks = [
  { name: "Новобранец", minLevel: 1, color: "text-muted-foreground" },
  { name: "Курсант", minLevel: 5, color: "text-hud-cyan" },
  { name: "Тактик", minLevel: 10, color: "text-hud-green" },
  { name: "Стратег", minLevel: 20, color: "text-hud-amber" },
  { name: "Командир", minLevel: 35, color: "text-hud-red" },
  { name: "Ас", minLevel: 50, color: "text-primary" },
];

const Academy = () => {
  const currentRankIndex = ranks.findIndex(r => r.name === userStats.rank);
  const nextRank = ranks[currentRankIndex + 1];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-hud-amber" />
              Академия
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Прокачка навыков и миссии</p>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-hud-amber" />
            <span className="font-mono font-bold text-hud-amber">{userStats.streak} дней</span>
          </div>
        </div>

        {/* User Stats Banner */}
        <Card variant="hud" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-hud-green/5 to-hud-cyan/5" />
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Level & Rank */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center bg-gradient-to-br from-primary/20 to-transparent">
                    <span className="font-mono text-2xl font-bold text-primary">{userStats.level}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-hud-amber border-2 border-background">
                    <Star className="h-4 w-4 text-background" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xl font-bold text-foreground">{userStats.rank}</p>
                  <p className="text-xs text-muted-foreground">
                    {nextRank ? `До ${nextRank.name}: ${nextRank.minLevel - userStats.level} уровней` : "Максимальный ранг!"}
                  </p>
                </div>
              </div>

              {/* XP Progress */}
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">Опыт</span>
                  <span className="text-xs font-mono text-primary">
                    {userStats.xp} / {userStats.xpToNext} XP
                  </span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary to-hud-cyan transition-all duration-500"
                    style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Missions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
              Активные миссии
            </h2>
            <div className="space-y-4">
              {missions.map((mission) => (
                <Card 
                  key={mission.id} 
                  variant={mission.status === "completed" ? "hud" : "panel"}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {mission.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <h3 className="font-mono font-semibold text-foreground">{mission.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground ml-7">{mission.description}</p>
                        
                        {mission.status !== "completed" && (
                          <div className="mt-3 ml-7">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-mono text-muted-foreground">
                                Прогресс
                              </span>
                              <span className="text-[10px] font-mono text-foreground">
                                {mission.progress}/{mission.total}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <Badge variant={mission.status === "completed" ? "success" : "hudCyan"}>
                        +{mission.xp} XP
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
              Достижения
            </h2>
            <Card variant="panel">
              <CardContent className="p-4 space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center gap-3 p-2 rounded ${
                      achievement.unlocked ? 'bg-primary/10' : 'bg-muted/30 opacity-50'
                    }`}
                  >
                    <div className={`p-2 rounded ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                      {achievement.unlocked ? (
                        <achievement.icon className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <span className={`font-mono text-sm ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {achievement.name}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Ranks */}
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground pt-4">
              Ранги
            </h2>
            <Card variant="hudAmber">
              <CardContent className="p-4 space-y-2">
                {ranks.map((rank, i) => (
                  <div 
                    key={rank.name}
                    className={`flex items-center justify-between p-2 rounded ${
                      rank.name === userStats.rank ? 'bg-hud-amber/10 border border-hud-amber/30' : ''
                    }`}
                  >
                    <span className={`font-mono text-sm ${rank.color}`}>{rank.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">Уровень {rank.minLevel}+</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Academy;
