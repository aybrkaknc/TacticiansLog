# Wiki Özelliği - Dokümantasyon

## Genel Bakış

`Wiki.jsx` Fire Emblem Awakening için kapsamlı oyun ansiklopedisi sunar.

**Veri Kaynakları:** fireemblem.fandom.com, serenesforest.net

## İçerik

| Kategori | Adet | Açıklama |
|----------|------|----------|
| Sınıflar | 48 | Base, Promoted, Özel, DLC |
| Yetenekler | 41 | S/A/B/C tier sistemi |
| Silahlar | 35 | MT, HIT, CRIT, RNG statları |
| Karakterler | 30 | Join chapter, başlangıç sınıfı |
| Mekanikler | 8 | Detaylı tips |

## Özellikler

### Ağaç Görünümü
- Base sınıflar genişletilebilir
- Promoted sınıflar alt dal olarak görünür
- Özel ve DLC sınıflar ayrı kategorilerde

### Tıklanabilir Linkler
Base sınıf detaylarında "Terfi Seçenekleri" butonları

### Hızlı Erişim
Tümünü genişlet/daralt butonları

## Teknik Yapı

```jsx
// State
const [tab, setTab] = useState('classes');
const [selected, setSelected] = useState(null);
const [expandedCategories, setExpandedCategories] = useState({});

// Memoized tree structure
const classTree = useMemo(() => {...}, []);
```

## Bağımlılıklar
- `lucide-react`: Search, BookOpen, Sword, Shield, Zap, Star, Users, ChevronRight, ChevronDown, ChevronsUpDown, ChevronsDownUp
