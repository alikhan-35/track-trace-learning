import { AlertTriangle, Send } from 'lucide-react';
import { supportChannels } from '../data/trainingData';

const SupportPage = () => (
  <div className="space-y-6">
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-950">Поддержка</h1>
      <p className="mt-2 max-w-2xl leading-7 text-slate-600">
        Выберите канал по типу вопроса. Для будущей авторизации здесь можно показывать профиль,
        роль пользователя и историю обращений.
      </p>
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      {supportChannels.map((channel) => (
        <article key={channel.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
              <channel.icon className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-950">{channel.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{channel.description}</p>
              <p className="mt-3 text-sm font-semibold text-brand-700">{channel.contact}</p>
            </div>
          </div>
        </article>
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Быстрое обращение</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Роль</span>
            <select className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900">
              <option>Новый пользователь</option>
              <option>Оператор</option>
              <option>Администратор</option>
              <option>Склад</option>
              <option>Логистика</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Тема</span>
            <select className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900">
              <option>Доступ</option>
              <option>Ошибка статуса</option>
              <option>Вопрос по процессу</option>
              <option>Обучение</option>
            </select>
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-semibold text-slate-700">Описание</span>
          <textarea
            className="focus-ring mt-2 min-h-32 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900"
            placeholder="Номер объекта, ожидаемый результат, текст ошибки"
          />
        </label>
        <button
          type="button"
          className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          <Send className="h-4 w-4" />
          Подготовить обращение
        </button>
      </form>

      <aside className="h-fit rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="font-bold">Перед отправкой</h2>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-6">
          <li>Укажите номер объекта или отправления.</li>
          <li>Добавьте свою роль и участок процесса.</li>
          <li>Опишите ожидаемый и фактический результат.</li>
          <li>Приложите скриншот сообщения системы.</li>
        </ul>
      </aside>
    </section>
  </div>
);

export default SupportPage;
