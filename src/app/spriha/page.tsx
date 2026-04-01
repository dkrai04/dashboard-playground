import Link from "next/link";

export default function SprihaIndex() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-8">
      <h1
        className="text-[28px] font-semibold mb-2"
        style={{ color: "#222530" }}
      >
        Spriha&apos;s Prototypes
      </h1>
      <p className="text-[15px] mb-12" style={{ color: "#717784" }}>
        Work-in-progress design explorations
      </p>

      <div className="grid gap-4 w-full max-w-[600px]">
        <Link href="/spriha/lpay-onboarding">
          <div
            className="border border-[#e1e4ea] rounded-[12px] p-6 hover:shadow-md transition-shadow cursor-pointer bg-white"
            style={{ boxShadow: "0px 2px 1px 0px rgba(5,5,6,0.05)" }}
          >
            <h2
              className="text-[18px] font-semibold mb-1"
              style={{ color: "#2b303b" }}
            >
              Lotuspay Onboarding
            </h2>
            <p className="text-[14px]" style={{ color: "#717784" }}>
              Login → NACH onboarding flow for Lotuspay merchants
            </p>
          </div>
        </Link>

        <Link href="/spriha/infra-scale-up">
          <div
            className="border border-[#e1e4ea] rounded-[12px] p-6 hover:shadow-md transition-shadow cursor-pointer bg-white"
            style={{ boxShadow: "0px 2px 1px 0px rgba(5,5,6,0.05)" }}
          >
            <h2
              className="text-[18px] font-semibold mb-1"
              style={{ color: "#2b303b" }}
            >
              Infra Scale Up Request
            </h2>
            <p className="text-[14px]" style={{ color: "#717784" }}>
              End-to-end flow for raising an infrastructure scale up request
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
