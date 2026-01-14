# 🛡️ Fire Emblem Awakening Companion - Uygulama Planı

## 📋 Proje Durumu

**Uygulama:** React + Vite + Electron masaüstü uygulaması  
**Konum:** `fe-app-react/`  
**Son Güncelleme:** 12 Ocak 2026

---

## 📂 Klasör Yapısı

```
FireEmblemAwakening/
├── .agent/workflows/     # AI komut dosyaları
├── archive/              # Arşivlenmiş dosyalar
├── docs/                 # Dokümantasyon
├── tools/                # Python scriptleri
├── data/                 # JSON oyun verileri
└── fe-app-react/         # ⭐ ANA UYGULAMA
    ├── .env.example      # API anahtarları şablonu
    └── src/
        ├── components/   # UI parçaları (Sidebar, PageHeader, vb.)
        ├── pages/        # Sayfa bileşenleri
        ├── hooks/        # React hook'ları
        ├── data/         # Oyun verileri + AI bilgisi
        ├── services/     # API servisleri
        ├── utils/        # Yardımcı fonksiyonlar
        ├── constants/    # Sabit değerler
        └── context/      # React Context
```

---

## 🚀 Başlatma Komutları

| Komut | Açıklama |
|---|---|
| `npm run dev` | Tarayıcıda geliştirme (port 5173) |
| `npm run electron:dev` | Masaüstü uygulaması |
| `npm run build` | Üretim derlemesi |

---

## ✅ GEMINI.md Uyumluluk

| Kural | Durum |
|---|---|
| İsimlendirme (camelCase/PascalCase) | ✅ |
| JSDoc Dokümantasyon | ✅ |
| Hata Yönetimi (try-catch) | ✅ |
| Modülerlik | ✅ |
| Responsiveness | ✅ |
| Gizli Bilgiler (.env) | ✅ |
| Bağımlılık Kontrolü | ✅ |
