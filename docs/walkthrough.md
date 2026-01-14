# 📚 Wiki Özelliği ve UI Geliştirmeleri

## Son Güncellemeler (Promotion Trees)

Wiki sayfamız artık daha profesyonel ve stratejik bir görünüme sahip. En son yapılan "Promotion Tree" güncellemesi ile:

1.  **Görsel Hiyerarşi:** Sınıflar artık **Base -> Promoted** yollarını gösterecek şekilde ağaç yapısında. Sol tarafta temel sınıf, sağ tarafta ise ondan terfi edilebilecek seçenekler yer alıyor.
2.  **Stratejik Vurgular:** 
    *   🔵 **Mavi Border**: Temel (Base) sınıfı temsil eder.
    *   🟡 **Altın Border**: Güçlü yetenekleri (örn: Galeforce, Luna) nedeniyle önerilen terfi yollarını vurgular.
    *   ✨ **Glow Efekti**: "Dark Flier" gibi oyunun metasını belirleyen efsanevi sınıfları belirtir.
3.  **Tematik Dokunuşlar:** Uygulamanın üst header kısmına her sekme için özel ikonlar (Users, Heart, Backpack, Scroll, BookOpen) eklenerek Ylissean teması güçlendirildi.

## Uygulama Durumu
- Tüm Türkçe karakter sorunları giderildi (UTF-8).
- Ana başlıklar `PageHeader` sistemine entegre edilerek sayfa içi alan genişletildi.
- Performans optimizasyonu için `useMemo` ile veri filtreleme yapıldı.
