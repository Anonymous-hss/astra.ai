import { CosmicOrb } from "@/components/ui/cosmic-elements";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cosmic-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <CosmicOrb size={40} color="primary" />
          </div>
        </div>
        <p className="mt-4 text-cosmic-primary-400">
          Loading Business Guruji...
        </p>
      </div>
    </div>
  );
}
