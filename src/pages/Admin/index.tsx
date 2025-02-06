import { Trending } from '../../components/Trending';
import { AdminLayout } from '../../components/layouts/AdminLayout';

export function Admin() {

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="relative h-[30vh] bg-cover bg-center flex items-center justify-center mb-8"
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-4">
              ADMIN <span className="text-[#FF4655]">DASHBOARD</span>
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a1a1a] p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]">
            <h3 className="text-xl font-bold mb-2">Total Teams</h3>
            <p className="text-4xl font-bold text-[#FF4655]">16</p>
            <p className="text-white/60 mt-2">Participating Teams</p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]">
            <h3 className="text-xl font-bold mb-2">Active Teams</h3>
            <p className="text-4xl font-bold text-[#FF4655]">12</p>
            <p className="text-white/60 mt-2">Still in Tournament</p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]">
            <h3 className="text-xl font-bold mb-2">Eliminated</h3>
            <p className="text-4xl font-bold text-[#FF4655]">4</p>
            <p className="text-white/60 mt-2">Teams Eliminated</p>
          </div>
        </div>

        {/* Tournament Matches */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg mb-8">
          <Trending />
        </div>
      </div>
    </AdminLayout>
  );
}