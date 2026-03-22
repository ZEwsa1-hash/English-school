'use client'

import { useState } from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

interface FaqItem {
  value: string
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    value: 'certificate',
    question: 'Я получу сертификат?',
    answer:
      'Да, после завершения курса вы получите официальный сертификат о прохождении обучения. Он подтверждает ваш уровень владения языком и может быть использован при трудоустройстве.',
  },
  {
    value: 'change-teacher',
    question: 'Можно ли будет сменить преподавателя или расписание?',
    answer:
      'Да, вы можете сменить преподавателя или скорректировать расписание по согласованию с администратором. Мы стараемся сделать обучение максимально комфортным для каждого.',
  },
  {
    value: 'how-courses',
    question: 'Как проходят курсы?',
    answer:
      'Занятия проходят онлайн через видеосвязь в Zoom или Google Meet. Каждый урок включает объяснение темы, живую практику, задания и домашнее задание с проверкой.',
  },
  {
    value: 'group-size',
    question: 'Сколько людей в группе?',
    answer:
      'В группе обычно 4–8 человек. Это позволяет уделить достаточно внимания каждому студенту, при этом сохраняя динамику живого общения.',
  },
  {
    value: 'sick',
    question: 'А если я заболею?',
    answer:
      'Если вы заболели, просто предупредите нас заранее. Занятие перенесут на удобное время или вы сможете посмотреть запись урока и не потерять прогресс.',
  },
  {
    value: 'refund',
    question:
      'Если у меня оплачено несколько занятий вперед, но я не могу продолжить обучение, вы вернете деньги?',
    answer:
      'Да, мы возвращаем средства за неиспользованные занятия. Для оформления возврата обратитесь к администратору — процедура занимает не более 5 рабочих дней.',
  },
]

export function Faq() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <section id="faq" className="w-full bg-white py-20 px-4">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-10 text-center w-full">
          Часто задаваемые вопросы
        </h2>

        <Accordion
          value={openItem !== null ? [openItem] : []}
          onValueChange={(items: string[]) => setOpenItem(items[0] ?? null)}
          className="flex flex-col gap-3 w-full max-w-[917px]"
        >
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border border-gray-200 rounded-[20px] bg-white overflow-hidden"
              style={{ boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.10)' }}
            >
              <AccordionTrigger className="min-h-[54px] px-6 py-3 text-base font-medium text-gray-900">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 px-6 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
