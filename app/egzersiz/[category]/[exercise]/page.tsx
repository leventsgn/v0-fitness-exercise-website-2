import { notFound } from "next/navigation"
import ExerciseClient from "@/components/exercise-client"

const exerciseDetails: Record<string, Record<string, any>> = {
  "boyun-sirt": {
    "boyun-germe": {
      title: "Boyun Germe Egzersizi",
      description:
        "Boyun kaslarını gevşetmek ve boyun ağrılarını azaltmak için yapılan temel germe egzersizi. Özellikle uzun süre bilgisayar başında çalışanlar için faydalıdır.",
      image: "/neck-stretching-exercise-physiotherapy.jpg",
      video: "/neck-stretching-exercise-demonstration-animation.jpg",
      instructions: [
        "Dik bir şekilde oturun veya ayakta durun",
        "Başınızı yavaşça sağa doğru eğin, kulağınızı omzunuza yaklaştırın",
        "15-30 saniye bu pozisyonda bekleyin",
        "Başınızı merkeze getirin ve sol tarafa tekrarlayın",
        "Hareket sırasında omuzlarınızı gevşek tutun",
      ],
      sets: 3,
      reps: "Her yöne 2",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Ekipman Yok",
      targetMuscles: ["Levator Scapulae", "Üst Trapezius", "Sternokleidomastoid"],
      warnings: ["Ani hareketlerden kaçının", "Ağrı hissederseniz durdurun", "Derin nefes almayı unutmayın"],
    },
    "kedi-deve": {
      title: "Kedi-Deve Hareketi",
      description: "Omurga esnekliğini artıran ve sırt kaslarını gevşeten yoga kökenli bir fizyoterapi egzersizi.",
      image: "/placeholder.svg?height=600&width=800",
      video: "/cat-cow-exercise-demonstration-animation.jpg",
      instructions: [
        "Dört ayak üzerinde pozisyon alın (el ve dizler yerde)",
        "Ellerinizi omuz hizasında, dizlerinizi kalça hizasında yerleştirin",
        "Nefes vererek sırtınızı yukarı doğru kambur yapın (Kedi)",
        "Nefes alarak göğsünüzü öne itip sırtınızı aşağı doğru çökertin (Deve)",
        "Hareketi yavaş ve kontrollü şekilde tekrarlayın",
      ],
      sets: 2,
      reps: "10-15",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Egzersiz Matı",
      targetMuscles: ["Erector Spinae", "Abdominal Kaslar", "Torasik Omurga"],
      warnings: ["Boyun ve bel bölgesini aşırı zorlamayın", "Hareket akıcı olmalı"],
    },
  },
  diz: {
    "kuadriseps-gucendirme": {
      title: "Kuadriseps Güçlendirme",
      description: "Diz stabilitesini artıran ve kuadriseps kasını güçlendiren temel rehabilitasyon egzersizi.",
      image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      video: "/quadriceps-strengthening-exercise-demonstration.jpg",
      instructions: [
        "Sandalyeye dik bir şekilde oturun",
        "Bir bacağınızı yavaşça düz bir şekilde kaldırın",
        "Ayak bileğinizi kendinize doğru çekin (dorsifleksiyon)",
        "Bacağınızı 5-10 saniye yukarıda tutun",
        "Yavaşça yere indirin ve diğer bacakla tekrarlayın",
      ],
      sets: 3,
      reps: "10-15",
      restTime: 45,
      difficulty: "Başlangıç",
      equipment: "Sandalye",
      targetMuscles: ["Kuadriseps (Rectus Femoris, Vastus Lateralis)", "Vastus Medialis"],
      warnings: ["Diz ağrısı hissedersinizse durdurun", "Hareket yavaş ve kontrollü olmalı"],
    },
  },
  omuz: {
    sarkaç: {
      title: "Sarkaç Egzersizi (Pendulum)",
      description:
        "Omuz ağrıları ve donuk omuz için yapılan pasif hareket egzersizi. Omuz eklemini gevşetir ve hareket açıklığını artırır.",
      image: "/pendulum-shoulder-exercise-physiotherapy.jpg",
      video: "/shoulder-pendulum-exercise-demonstration-animation.jpg",
      instructions: [
        "Bir masaya yaslanarak öne doğru eğilin",
        "Sağlıklı kolunuzla masaya destek olun",
        "Ağrılı kolunuzu sarkıtın ve gevşetin",
        "Kolunuzu küçük daireler çizerek sallamaya başlayın",
        "Önce saat yönünde, sonra ters yönde çevirin",
        "Kaslarınızı gevşek tutun, ağırlık sallanımı sağlasın",
      ],
      sets: 3,
      reps: "10 her yön",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Masa/Sandalye",
      targetMuscles: ["Rotator Cuff", "Deltoid", "Omuz Kapsülü"],
      warnings: ["Kas gücü kullanmayın, salınım pasif olmalı", "Ağrı artarsa durdurun"],
    },
  },
  bel: {
    "ayak-pompasi": {
      title: "Ayak Pompası Egzersizi",
      description: "Ayak bileği ve alt bacak dolaşımını artıran, derin ven trombozu önleme egzersizi.",
      image: "/ankle-and-foot-physiotherapy-rehabilitation.jpg",
      video: "/ankle-pump-exercise-demonstration-animation.jpg",
      instructions: [
        "Sırt üstü veya oturarak pozisyon alın",
        "Bacağınızı uzatın",
        "Ayak parmaklarınızı kendinize doğru çekin",
        "Sonra ayak parmaklarınızı öne doğru uzatın",
        "Hareketi ritmik bir şekilde tekrarlayın",
      ],
      sets: 3,
      reps: "15-20",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Ekipman Yok",
      targetMuscles: ["Tibialis Anterior", "Gastroknemius", "Soleus"],
      warnings: ["Hareket yumuşak olmalı", "Kramp hissederseniz dinlenin"],
    },
  },
}

export default async function ExercisePage({ params }: { params: Promise<{ category: string; exercise: string }> }) {
  const { category, exercise } = await params
  const exerciseData = exerciseDetails[category]?.[exercise]

  if (!exerciseData) {
    notFound()
  }

  return <ExerciseClient exercise={exerciseData} category={category} />
}

export async function generateStaticParams() {
  const params: Array<{ category: string; exercise: string }> = []

  for (const category in exerciseDetails) {
    for (const exercise in exerciseDetails[category]) {
      params.push({
        category,
        exercise,
      })
    }
  }

  return params
}
