import LevelScreen from '../../../components/levels/LevelScreen';

interface Props {
  params: Promise<{ level: string }> | { level: string };
}

export default async function Page({ params }: Props) {
  const { level } = (await params) as { level: string };
  // Use `key` to force remount when `level` changes, avoiding preserved client state
  return <LevelScreen key={level} level={level} />;
}
