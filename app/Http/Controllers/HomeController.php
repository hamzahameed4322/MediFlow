<?php

namespace App\Http\Controllers;

use App\Models\DoctorProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        $doctors = DoctorProfile::with('user')
            ->whereHas('user', function ($query) {
                $query->where('status', 'active');
            })
            ->orderByDesc('experience')
            ->limit(3)
            ->get()
            ->map(function ($doctor, $index) {
                // Compute initials
                $cleanName = preg_replace('/^dr\.?\s+/i', '', $doctor->user->name);
                $words = explode(' ', $cleanName);
                $initials = '';
                foreach ($words as $w) {
                    if (! empty($w)) {
                        $initials .= strtoupper($w[0]);
                    }
                }
                $initials = substr($initials, 0, 2);
                if (empty($initials)) {
                    $initials = 'DR';
                }

                // Assign color based on index
                $colors = [
                    'from-teal-500 to-emerald-400',
                    'from-cyan-500 to-teal-400',
                    'from-emerald-600 to-teal-500',
                ];
                $color = $colors[$index % count($colors)];

                return [
                    'name' => $doctor->user->name,
                    'specialty' => $doctor->specialization,
                    'experience' => $doctor->experience.'+ years experience',
                    'initials' => $initials,
                    'color' => $color,
                ];
            });

        return Inertia::render('welcome', [
            'featuredDoctors' => $doctors,
        ]);
    }
}
