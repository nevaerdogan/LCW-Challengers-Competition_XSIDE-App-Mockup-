import { Send, Mic, ChevronLeft, MoreVertical } from 'lucide-react';

const suggestions = [
  { emoji: '☀️', text: 'Bugün ne giysem?' },
  { emoji: '💼', text: 'İş görüşmesi' },
  { emoji: '☕', text: 'Kafe buluşması' },
  { emoji: '🎉', text: 'Parti kombini' },
  { emoji: '💰', text: 'Bütçe dostu' },
];

const chatMessages = [
  {
    id: 1,
    role: 'assistant' as const,
    time: '14:30',
    content: {
      type: 'text' as const,
      text: 'Merhaba! 👋 Ben XSIDE stil asistanın.\n\nSana kişisel kombin önerileri sunabilirim. Nereye gidiyorsun veya nasıl bir tarz arıyorsun?',
    },
  },
  {
    id: 2,
    role: 'user' as const,
    time: '14:32',
    content: {
      type: 'text' as const,
      text: 'Arkadaşlarla kafeye gidiyorum, rahat ama şık bir şey istiyorum',
    },
  },
  {
    id: 3,
    role: 'assistant' as const,
    time: '14:32',
    content: {
      type: 'combo' as const,
      text: 'Harika seçim! Kafe buluşması için sana özel kombin önerilerim:',
      combos: [
        {
          title: 'Casual Chic',
          tag: 'Trend',
          items: ['Oversize beyaz tee', 'Wide leg jean', 'Beyaz sneaker'],
          emoji: '🤍',
        },
        {
          title: 'Street Cool',
          tag: 'Popüler',
          items: ['Crop hoodie', 'Cargo jogger', 'Platform ayakkabı'],
          emoji: '🖤',
        },
      ],
      cta: 'Bu kombinleri sepetine ekleyeyim mi?',
    },
  },
];

export default function AITab() {
  return (
    <div className="flex flex-col h-full" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '8px 16px 10px' }}>
        <div className="flex items-center justify-between">
          <button className="flex items-center justify-center" style={{ width: 32, height: 32 }}>
            <ChevronLeft size={22} color="#1A1A1A" />
          </button>
          <div className="text-center flex-1">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>AI Stil Asistanı</h2>
            <div className="flex items-center justify-center gap-1.5" style={{ marginTop: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50' }} />
              <span style={{ fontSize: 12, color: '#4CAF50', fontWeight: 500 }}>Çevrimiçi</span>
            </div>
          </div>
          <button className="flex items-center justify-center" style={{ width: 32, height: 32 }}>
            <MoreVertical size={20} color="#8E8E8E" />
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px 16px 8px' }}>
        <div className="space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2'}`}>
              {msg.role === 'assistant' && (
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5C518', marginTop: 2 }}
                >
                  <span style={{ fontSize: 16 }}>✨</span>
                </div>
              )}

              <div style={{ maxWidth: msg.role === 'user' ? '80%' : '85%' }}>
                {msg.content.type === 'text' ? (
                  <div
                    style={{
                      padding: '12px 16px',
                      fontSize: 14,
                      lineHeight: '20px',
                      ...(msg.role === 'user'
                        ? {
                            background: '#F5C518',
                            borderRadius: '18px 4px 18px 18px',
                            color: '#1A1A1A',
                            fontWeight: 500,
                          }
                        : {
                            background: '#FFFFFF',
                            borderRadius: '4px 18px 18px 18px',
                            color: '#1A1A1A',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                          }),
                    }}
                  >
                    {msg.content.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.content.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                ) : msg.content.type === 'combo' ? (
                  <div
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '4px 18px 18px 18px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ padding: '12px 16px', fontSize: 14, lineHeight: '20px', color: '#1A1A1A' }}>
                      {msg.content.text}
                    </div>

                    <div style={{ background: '#FAFAFA', borderRadius: 12, margin: '0 12px', padding: 12 }}>
                      {msg.content.combos?.map((combo, i) => (
                        <div key={i}>
                          {i > 0 && <div style={{ height: 1, background: '#EEEEEE', margin: '10px 0' }} />}
                          <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 14 }}>{combo.emoji}</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{combo.title}</span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                color: '#F5C518',
                                background: '#FFF8E1',
                                padding: '2px 8px',
                                borderRadius: 10,
                              }}
                            >
                              {combo.tag}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {combo.items.map((item, j) => (
                              <div key={j} className="flex items-center gap-2" style={{ paddingLeft: 8 }}>
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F5C518' }} />
                                <span style={{ fontSize: 13, color: '#444444' }}>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: '12px 12px 14px' }}>
                      <p style={{ fontSize: 12, color: '#8E8E8E', marginBottom: 10, textAlign: 'center' }}>{msg.content.cta}</p>
                      <div className="flex gap-[10px]">
                        <button
                          className="flex-1 flex items-center justify-center active:scale-[0.96] transition-all duration-200"
                          style={{
                            height: 44,
                            borderRadius: 22,
                            background: '#F5C518',
                            color: '#1A1A1A',
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          EVET, EKLE
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center active:scale-[0.96] transition-all duration-200"
                          style={{
                            height: 44,
                            borderRadius: 22,
                            background: 'transparent',
                            border: '1.5px solid #E0E0E0',
                            color: '#666666',
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          BAŞKA ÖNER
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <p
                  style={{
                    fontSize: 11,
                    color: '#BABABA',
                    marginTop: 4,
                    textAlign: msg.role === 'user' ? 'right' : 'left',
                  }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick suggestions */}
      <div style={{ padding: '8px 16px 4px' }}>
        <p style={{ fontSize: 11, color: '#BABABA', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6, fontWeight: 600 }}>
          Hızlı Öneriler
        </p>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', paddingBottom: 4 }}>
          {suggestions.map((s) => (
            <button
              key={s.text}
              className="flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-transform"
              style={{
                background: '#F5F5F5',
                borderRadius: 20,
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 8,
                paddingBottom: 8,
                fontSize: 12,
                color: '#444444',
              }}
            >
              <span>{s.emoji}</span>
              <span>{s.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div style={{ background: '#FFFFFF', padding: '10px 16px 12px', borderTop: '1px solid #F0F0F0' }}>
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center"
            style={{ background: '#F5F5F5', borderRadius: 24, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}
          >
            <input
              type="text"
              placeholder="Stilini tarif et..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: 14, color: '#1A1A1A' }}
              readOnly
            />
          </div>
          <button
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: 38, height: 38, borderRadius: '50%', background: '#F5F5F5' }}
          >
            <Mic size={18} color="#999999" />
          </button>
          <button
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: 38, height: 38, borderRadius: '50%', background: '#F5C518' }}
          >
            <Send size={16} color="#FFFFFF" style={{ marginLeft: 1 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
