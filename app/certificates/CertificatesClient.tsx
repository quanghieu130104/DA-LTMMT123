"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  proofImage?: string | null;
  link: string | null;
  status: string | null;
};

export default function CertificatesClient({ data }: { data: Certificate[] }) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCert]);

  // Logic kiểm tra link hiển thị
  const displayUrl = selectedCert ? (selectedCert.proofImage || selectedCert.image) : "";
  const isPdf = displayUrl.toLowerCase().endsWith(".pdf");

  return (
    <>
      {/* DANH SÁCH CHỨNG CHỈ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedCert(item)}
            className="group relative bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-500 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:border-purple-500/40 flex flex-col h-full cursor-pointer z-10"
          >
            <div className="relative h-[220px] w-full flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent p-6">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="object-contain max-w-full max-h-full drop-shadow-xl transition duration-500 group-hover:scale-110"
              />
              {item.status === "Verified" && (
                <div className="absolute top-4 right-4 bg-purple-500/20 backdrop-blur-md text-purple-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-purple-500/30 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span> VERIFIED
                </div>
              )}
            </div>

            <div className="p-8 pt-4 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{item.issuer}</span>
                <span className="text-xs font-mono text-neutral-500 bg-white/5 px-2 py-1 rounded">{item.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white leading-tight mb-4 group-hover:text-purple-300 transition line-clamp-2">
                {item.title}
              </h3>
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-sm text-neutral-400 font-medium group-hover:text-white transition">
                Xem chi tiết <span className="ml-2 text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {mounted && typeof document !== 'undefined' && selectedCert && createPortal(
        <div 
            style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.9)', 
                backdropFilter: 'blur(8px)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
            onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-red-600 transition border border-white/20 cursor-pointer"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* --- PHẦN 1: ẢNH BẰNG KHEN (NẰM TRÊN) --- */}
            <div 
                className="w-full flex items-center justify-center p-0 relative"
                // 👇 STYLE CỨNG: Ép nền trắng và chiều cao, bất chấp Dark Mode
                style={{ 
                    backgroundColor: '#ffffff', 
                    minHeight: '400px',
                    height: 'auto'
                }}
            >
                {isPdf ? (
                    <iframe 
                        src={displayUrl + "#toolbar=0"} 
                        className="w-full h-[500px] border-none"
                        title="Certificate PDF"
                    />
                ) : (
                    <>
                         {/* Hoa văn nền */}
                        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
                        
                        <div className="relative z-10 w-full h-full p-6 flex flex-col items-center justify-center">
                            {/* Ảnh hiển thị */}
                            <div className="relative w-full" style={{ height: '400px' }}>
                                {displayUrl && (
                                  <Image 
                                    src={displayUrl} 
                                    alt="Certificate Proof" 
                                    fill 
                                    className="object-contain" 
                                  />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* --- PHẦN 2: THÔNG TIN CHI TIẾT (NẰM DƯỚI) --- */}
            <div className="w-full bg-[#111] p-6 border-t border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{selectedCert.title}</h2>
                        <p className="text-purple-400 font-medium">{selectedCert.issuer}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                            <span className="text-xl">📅</span>
                            <div>
                                <div className="text-[10px] text-neutral-500 uppercase font-bold">Ngày cấp</div>
                                <div className="text-white text-sm font-mono">{selectedCert.date}</div>
                            </div>
                        </div>

                        <Link 
                            href={selectedCert.link || "#"} 
                            target="_blank" 
                            className="flex-1 md:flex-none px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                        >
                            🔗 Xem xác thực gốc
                        </Link>
                    </div>

                </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}