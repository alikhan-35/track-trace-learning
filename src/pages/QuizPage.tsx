import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Quiz from '../components/Quiz';
import { roles } from '../data/trainingData';

const QuizPage = () => {
  const { roleId, moduleId } = useParams();
  const role = roles.find((item) => item.id === roleId);
  const module = role?.modules.find((item) => item.id === moduleId);

  if (!role || !module) {
    return <Navigate to="/roles" replace />;
  }

  return (
    <div className="space-y-6">
      <Link
        to={`/roles/${role.id}/modules/${module.id}`}
        className="focus-ring inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Вернуться к модулю
      </Link>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold text-brand-700">{role.title}</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">{module.title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Тест закрепляет ключевые действия и типовые решения модуля.</p>
      </section>

      <Quiz questions={module.quiz} />
    </div>
  );
};

export default QuizPage;
