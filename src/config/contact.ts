// お問い合わせ機能の設定
export const contactConfig = {
  // Google Apps Script の Web App URL
  // 実際のスクリプトIDに置き換えてください
  googleScriptUrl: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  
  // 管理者メールアドレス
  adminEmail: process.env.ADMIN_EMAIL || 'admin@tsukikage-sato.com',
  
  // 旅館情報
  ryokanInfo: {
    name: '渓谷の湯 旅館『月影の郷』',
    address: '〒000-0000 ○○県○○市○○町○○-○○',
    phone: '000-0000-0000',
    businessHours: '9:00〜21:00',
    email: 'info@tsukikage-sato.com',
  },
  
  // お問い合わせカテゴリ
  categories: [
    { value: 'reservation', label: 'ご予約について' },
    { value: 'accommodation', label: '宿泊について' },
    { value: 'onsen', label: '温泉について' },
    { value: 'cuisine', label: 'お料理について' },
    { value: 'access', label: 'アクセスについて' },
    { value: 'other', label: 'その他' },
  ],
  
  // 連絡方法
  contactMethods: [
    { value: 'email', label: 'メール' },
    { value: 'phone', label: 'お電話' },
  ],
  
  // メールテンプレート
  emailTemplates: {
    admin: {
      subject: '【月影の郷】新しいお問い合わせが届きました',
      body: (data: any) => `
新しいお問い合わせが届きました。

【お名前】${data.name}
【メールアドレス】${data.email}
【電話番号】${data.phone}
【お問い合わせ内容】${data.subject}
【ご希望の連絡方法】${data.preferredContact}
【お問い合わせ詳細】
${data.message}

---
月影の郷 お問い合わせシステム
      `,
    },
    user: {
      subject: '【月影の郷】お問い合わせありがとうございます',
      body: (data: any) => `
${data.name} 様

お問い合わせありがとうございます。
以下の内容で承りました。

【お問い合わせ内容】${data.subject}
【お問い合わせ詳細】
${data.message}

内容を確認の上、担当者よりご連絡いたします。
しばらくお待ちください。

---
渓谷の湯 旅館『月影の郷』
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
受付時間: 9:00〜21:00
      `,
    },
  },
};
