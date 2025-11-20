export default function RacePage({ params }) {
  // 1. paramsを確認する(console.logで)
  console.log(params.id);

  // 2. localStorageから全レースを取得
  const saved = localStorage.getItem('races');


  // 3. params.idを使って、該当レースを探す


  // 4. レース情報を表示

  return (
    <div>
      <h1>レース詳細ページ</h1>
      {/* まずはparamsの中身を表示してみよう */}
    </div>
  );
}
