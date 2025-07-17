const DATA = {
  vocab: [
    { jp: "水", roma: "mizu", zh: "水" },
    { jp: "火", roma: "hi", zh: "火" },
    // 可擴充至少100筆 N5 單字
  ],
  grammar: [
    { jp: "〜があります", zh: "有～", example: "テーブルの上に本があります。" },
    // 可擴充10筆文法
  ],
  reading: [
    { text: "これは犬です。", zh: "這是一隻狗。", questions: [
      { q: "これは何ですか？", choices: ["犬", "猫"], answer: "犬" }
    ]},
    // 可擴充10篇短文
  ],
  listening: [
    { script: "おはようございます。", zh: "早安。", audio: "" },
    // 由你提供 PDF 聴解資訊後補 audio 或文字
  ],
  kana: [
    { jp: "あ", roma: "a" },
    { jp: "い", roma: "i" },
    // 全 50 音...
  ],
  quiz: [
    { question: "「水」の読み方は？", choices: ["みず","ひ"], answer: "みず" },
    // 初始50題範例
  ]
};
