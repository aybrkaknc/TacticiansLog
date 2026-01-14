# FE Awakening Companion - Kullanım Kılavuzu

## Portable Executable Versiyonu

### 📦 İçindekiler
- `FE_Awakening_Companion.exe` - Ana uygulama (tek dosya!)
- Uygulama çalıştırıldığında otomatik olarak:
  - `fe-app` klasörü (web arayüzü)
  - `data` klasörü (karakter verileri)
  - Açılır ve otomatik olarak temp klasöründe çalışır

### 🚀 Nasıl Çalıştırılır?

1. **FE_Awakening_Companion.exe** dosyasına çift tıkla
2. Konsol penceresi açılacak ve şunu göreceksin:
   ```
   Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
   ```
3. Web tarayıcını aç ve **http://localhost:8000/fe-app/** adresine git
4. Uygulama kullanıma hazır! 🎉

### ⚙️ Önemli Notlar

- **İlk Açılış:** İlk kez çalıştırdığında 10-15 saniye sürebilir (dosyaları açıyor)
- **Konsol Penceresi:** Konsolları DİKKATLİCE kapatın program kapanacaktır! 
- **Veriler:** Değişiklikleriniz `dist` klasörü içinde `data` klasöründe saklanır
- **Taşıma:** `.exe` dosyasını istediğin yere kopyalayabilirsin
- **İnternet:** İnternet bağlantısı GEREKMİYOR, tamamen offline çalışır

### 🔄 Güncelleme

Yeni bir versiyonu almak için:
1. Eski `.exe` dosyasını sil
2. Yeni `.exe` dosyasını kopyala
3. **ÖNEMLİ:** `data` klasörünü yedekle (karakterlerin burada!)

### 🗂️ Veri Yedekleme

Karakterlerini kaybetmemek için:
1. Uygulama kapanmışken `data` klasörünü kopyala
2. Güvenli bir yere kaydet
3. Gerektiğinde geri yükle

### 🐛 Sorun Giderme

**Uygulama açılmıyor:**
- Windows Defender uyarısı çıkarsa "Daha fazla bilgi" > "Yine de çalıştır"
- Antivirüs yazılımı engelleyebilir, güvenilen listesine ekle

**Port 8000 kullanımda hatası:**
- Başka bir uygulama Port 8000'i kullanıyor
- O uygulamayı kapat veya `server.py`'deki port numarasını değiştir

**Veriler kayboldu:**
- `data` klasörünü kontrol et
- Yedek varsa geri yükle

### 💡 İpuçları

- Tarayıcıyı bookmark'la: `http://localhost:8000/fe-app/`
- Her kullanımda önce `.exe`'yi çalıştır, sonra tarayıcıyı aç
- Çalışırken konsolu minimize edebilirsin ama KAPATMA!

### 🌍 Çoklu Dil Desteği (Multi-Language)

- Uygulama artık **Türkçe** ve **İngilizce** dillerini tam olarak desteklemektedir.
- Dil seçimi için ana sayfadaki (Landing Page) sağ üst köşedeki dil bayraklarını kullanabilirsiniz.
- Seçtiğiniz dil uygulama geneline (Karakterler, Lab, Envanter, Chat vb.) anında uygulanır.
- AEGIS Intel AI asistanı da çevirilerle uyumlu hale getirilmiştir.

---

**Keyifli oyunlar! 🎮🔥**
