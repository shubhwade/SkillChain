import { isDemoMode } from '../lib/demo';

export default function DemoBanner() {
    if (!isDemoMode()) return null;

    return (
        <div className="bg-dark-800 border-b border-dark-700">
            <div className="container-wide py-2 text-center text-sm text-neutral-400">
                <span className="font-medium text-white">Demo Mode</span>
                <span className="mx-2">—</span>
                <span>All features simulated for demonstration</span>
            </div>
        </div>
    );
}
