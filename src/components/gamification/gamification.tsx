"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export function AchievementBadge({ title, description, icon, earned, earnedAt }: AchievementBadgeProps) {
  return (
    <Card className={`transition-all duration-300 ${earned ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200" : "opacity-50 grayscale"}`}>
      <CardContent className="p-4 text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {earned && earnedAt && (
          <Badge variant="success" className="mt-2 text-xs">
            ✅ تم الحصول عليه
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

interface PointsDisplayProps {
  points: number;
  level: number;
}

export function PointsDisplay({ points, level }: PointsDisplayProps) {
  const pointsInLevel = points % 100;
  const percentage = pointsInLevel;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">المستوى</p>
            <p className="text-3xl font-bold text-primary">{level}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">النقاط</p>
            <p className="text-3xl font-bold text-yellow-500">⭐ {points}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>التقدم للمستوى التالي</span>
            <span>{pointsInLevel}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  level: number;
}

export function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 لوحة الصدارة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                entry.rank <= 3 ? "bg-yellow-50" : "hover:bg-gray-50"
              }`}
            >
              <span className={`text-lg font-bold w-8 text-center ${
                entry.rank === 1 ? "text-yellow-500" :
                entry.rank === 2 ? "text-gray-400" :
                entry.rank === 3 ? "text-amber-600" : "text-gray-500"
              }`}>
                {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
              </span>
              <div className="flex-1">
                <p className="font-medium">{entry.name}</p>
                <p className="text-xs text-gray-500">المستوى {entry.level}</p>
              </div>
              <Badge variant="secondary">⭐ {entry.points}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
