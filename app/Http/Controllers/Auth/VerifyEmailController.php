<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request, string $id, string $hash): RedirectResponse
    {
        // 1. Check if user is authenticated. If not, redirect to login.
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // 2. Check if the user ID in the link matches the authenticated user's ID
        if ((string) $user->getKey() !== (string) $id) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')->withErrors([
                'email' => 'The verification link is for a different user. Please sign in with the correct account.',
            ]);
        }

        // 3. Check if hash matches
        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403, 'Invalid verification link.');
        }

        // 4. Validate signature
        if (! $request->hasValidSignature()) {
            return redirect()->route('verification.notice')->withErrors([
                'email' => 'The verification link has expired or is invalid. Please request a new one.',
            ]);
        }

        // 5. Check if already verified
        if ($user->hasVerifiedEmail()) {
            return redirect()->to(route('dashboard', absolute: false).'?verified=1');
        }

        // 6. Mark as verified
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->to(route('dashboard', absolute: false).'?verified=1');
    }
}
