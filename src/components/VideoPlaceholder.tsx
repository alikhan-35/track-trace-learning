import { PlayCircle } from 'lucide-react';

interface VideoPlaceholderProps {
  title: string;
}

const VideoPlaceholder = ({ title }: VideoPlaceholderProps) => (
  <div className="flex aspect-video items-center justify-center rounded-lg border border-slate-200 bg-slate-900 text-white shadow-sm">
    <div className="text-center">
      <PlayCircle className="mx-auto h-14 w-14 text-blue-200" />
      <p className="mt-4 text-lg font-bold">{title}</p>
      <p className="mt-1 text-sm text-slate-300">Видео-урок будет добавлен в медиатеку</p>
    </div>
  </div>
);

export default VideoPlaceholder;
