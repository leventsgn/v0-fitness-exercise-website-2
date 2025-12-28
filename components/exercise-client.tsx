"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Exercise {
  title: string
  description: string
  image: string
  video: string
  instructions: string[]
  sets: number
  reps: string
  restTime: number
  difficulty: string
  equipment: string
  targetMuscles: string[]
  warnings: string[]
}

interface ExerciseClientProps {
  exercise: Exercise
  category: string
}

export default function ExerciseClient({ exercise, category }: ExerciseClientProps) {
  const [currentSet, setCurrentSet] = useState(1)
  const [currentRep, setCurrentRep] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTimeLeft, setRestTimeLeft] = useState(exercise.restTime)
  const [isRestTimerActive, setIsRestTimerActive] = useState(false)
  const [showVideo, setShowVideo] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRestTimerActive && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((time) => time - 1)
      }, 1000)
    } else if (restTimeLeft === 0) {
      setIsRestTimerActive(false)
      setIsResting(false)
      setRestTimeLeft(exercise.restTime)
    }
    return () => clearInterval(interval)
  }, [isRestTimerActive, restTimeLeft, exercise.restTime])

  const handleRepComplete = () => {
    const maxReps = Number.parseInt(exercise.reps.split("-")[1])
    if (currentRep < maxReps) {
      setCurrentRep(currentRep + 1)
    }
  }

  const handleRepIncrease = () => {
    const maxReps = Number.parseInt(exercise.reps.split("-")[1])
    if (currentRep < maxReps) {
      setCurrentRep(currentRep + 1)
    }
  }

  const handleRepDecrease = () => {
    if (currentRep > 0) {
      setCurrentRep(currentRep - 1)
    }
  }

  const handleSetComplete = () => {
    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1)
      setCurrentRep(0)
      setIsResting(true)
      setIsRestTimerActive(true)
      setRestTimeLeft(exercise.restTime)
    }
  }

  const handleReset = () => {
    setCurrentSet(1)
    setCurrentRep(0)
    setIsResting(false)
    setIsRestTimerActive(false)
    setRestTimeLeft(exercise.restTime)
  }

  const toggleRestTimer = () => {
    setIsRestTimerActive(!isRestTimerActive)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/kategori/${category}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Geri Dön
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/profil">
                <Button variant="outline" size="icon" className="rounded-lg bg-transparent">
                  <User className="w-5 h-5" />
                  <span className="sr-only">Hasta Profili</span>
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Exercise Video/Image */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                {showVideo ? (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Video yakında eklenecek</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => setShowVideo(false)}
                      >
                        Resmi Göster
                      </Button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={exercise.image}
                    alt={exercise.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">İlerleme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Set: {currentSet}/{exercise.sets}</span>
                  <span>Rep: {currentRep}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(currentSet / exercise.sets) * 100}%` }}
                  />
                </div>
                {isResting && (
                  <div className="text-center">
                    <p className="text-lg font-semibold">Dinlenme: {restTimeLeft}s</p>
                    <Button onClick={toggleRestTimer} variant="outline" size="sm">
                      {isRestTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Exercise Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{exercise.title}</CardTitle>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {exercise.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {exercise.equipment}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{exercise.description}</p>

                {/* Instructions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Talimatlar</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {exercise.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {/* Controls */}
                <div className="flex gap-2 mb-6">
                  <Button onClick={handleRepDecrease} variant="outline" size="sm">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleRepComplete} className="flex-1">
                    Rep Tamamla ({currentRep})
                  </Button>
                  <Button onClick={handleRepIncrease} variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSetComplete} variant="secondary" className="flex-1">
                    Set Tamamla
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Warnings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Uyarılar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {exercise.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Target Muscles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hedef Kaslar ve Bölgeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {exercise.targetMuscles.map((muscle, index) => (
                    <span key={index} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                      {muscle}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}