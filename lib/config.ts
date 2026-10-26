// ============================================================
//  AZHA AIN SOKHNA — ملف الإعدادات الوحيد اللي محتاج تعدّله
//  كل الأرقام والمفاتيح والأسعار هنا. أي قيمة null = بتظهر
//  في الصفحة كـ "اطلب التفاصيل" بدل رقم.
// ============================================================

export const site = {
  url: "https://azha-sokhna.vercel.app", // ← غيّرها للدومين النهائي
  brand: "Grandeur Spaces", // اسم الجهة اللي بتعلن (يظهر في الفوتر والإفصاح)
  // صياغة الإفصاح — عدّلها حسب وضعك مع مدار (وكيل معتمد / وسيط مستقل)
  agentDisclosure:
    "هذا الموقع تابع لـ Grandeur Spaces، مستشار عقاري مستقل، وليس الموقع الرسمي لشركة مدار للتطوير العقاري. جميع العلامات التجارية والأسماء ملك لأصحابها وتُستخدم لأغراض التعريف فقط.",
};

export const contact = {
  phone: "01116663367", // رقم الكول
  whatsapp: "201116663367", // رقم الواتساب بصيغة دولية بدون +
  whatsappMessage: "مرحباً، أريد تفاصيل فيلات أزها العين السخنة — الطرح الأول",
};

export const forms = {
  web3formsKey: "YOUR-WEB3FORMS-ACCESS-KEY", // ← حط مفتاح Web3Forms
  subject: "Lead جديد — Azha Ain Sokhna Villas",
};

// Google Ads — سيبها فاضية لحد ما تجهز التاجات
export const tracking = {
  gtagId: "AW-XXXXXXXXXX",
  conversions: {
    form: "AW-XXXXXXXXXX/FORM_LABEL",
    whatsapp: "AW-XXXXXXXXXX/WHATSAPP_LABEL",
    call: "AW-XXXXXXXXXX/CALL_LABEL",
  },
};

// ============================================================
//  بيانات الطرح — من البرشور
// ============================================================
export const launch = {
  developer: "مدار للتطوير العقاري",
  developerEn: "Madaar Development",
  project: "أزها العين السخنة",
  projectEn: "Azha Ain Sokhna",
  headline: "أفخم فيلات أزها على جزيرة خاصة",
  subheadline:
    "فيلات مستقلة بإطلالة مباشرة على اللاجون، على بُعد 500 متر فقط من البحر — تشطيب كامل بالمطبخ والتكييفات.",
  badge: "الطرح الأول — عدد محدود جداً",
  distanceToSea: "500 م",
};

// وحدات الطرح — عدّل/زوّد حسب البرشور. price/area = null → "اطلب التفاصيل"
export type Unit = {
  name: string;
  nameEn: string;
  image: string;
  bua: string | null; // مساحة المباني
  land: string | null; // مساحة الأرض / الحديقة
  bedrooms: string | null;
  price: string | null; // مثال: "29,514,000"
  features: string[];
};

// أرقام تقريبية (average) من فريق المبيعات — تتأكد مع أول كونفرم
export const units: Unit[] = [
  {
    name: "فيلا الجزيرة — النموذج الأصغر",
    nameEn: "Island Villa — Type A",
    image: "/images/villa-1.jpg",
    bua: "250",
    land: null,
    bedrooms: null,
    price: "39,000,000",
    features: [
      "إطلالة مباشرة على اللاجون",
      "500 متر من البحر",
      "تشطيب كامل بالمطبخ والتكييفات",
      "حديقة خاصة",
    ],
  },
  {
    name: "فيلا الجزيرة — النموذج الأكبر",
    nameEn: "Island Villa — Type B",
    image: "/images/villa-render.jpg",
    bua: "312 إلى 318",
    land: null,
    bedrooms: null,
    price: "45,000,000",
    features: [
      "دورين: أرضي ~170 م² + أول ~140 م²",
      "إطلالة مباشرة على اللاجون",
      "500 متر من البحر",
      "تشطيب كامل بالمطبخ والتكييفات",
    ],
  },
];

export const payment = {
  downPayment: null as string | null, // مثال: "5%"
  years: null as string | null, // مثال: "8"
  delivery: null as string | null, // مثال: "2029"
  notes: [
    "أنظمة سداد متعددة يتم الإعلان عنها مع الطرح",
    "أولوية الاختيار لعملاء الطرح الأول",
  ],
};
