<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="MediFlow - Streamlining patient management and clinic operations with our advanced Healthcare Management System.">
        <meta name="keywords" content="MediFlow, healthcare management, patient portal, clinic operations, doctor appointment">
        <meta name="author" content="MediFlow">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url('/') }}">
        <meta property="og:title" content="{{ config('app.name', 'MediFlow') }} - Healthcare Management System">
        <meta property="og:description" content="Streamlining patient management and clinic operations with our advanced Healthcare Management System.">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url('/') }}">
        <meta property="twitter:title" content="{{ config('app.name', 'MediFlow') }} - Healthcare Management System">
        <meta property="twitter:description" content="Streamlining patient management and clinic operations with our advanced Healthcare Management System.">
        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(0.98 0.004 250);
            }

            html.dark {
                background-color: oklch(0.13 0.015 260);
            }

            /* ---------------------------------------------------------------------- */
            /* MediFlow Cardio Healthcare Preloader Styles                           */
            /* ---------------------------------------------------------------------- */
            .mediflow-preloader {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: oklch(0.98 0.004 250);
                transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            html.dark .mediflow-preloader {
                background-color: oklch(0.13 0.015 260);
            }

            .mediflow-preloader.fade-out {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }

            .mediflow-preloader-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.25rem;
                text-align: center;
            }

            .mediflow-preloader-text {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .mediflow-preloader-brand {
                font-family: inherit;
                font-size: 1.25rem;
                font-weight: 700;
                letter-spacing: -0.025em;
                color: #0f172a;
            }

            html.dark .mediflow-preloader-brand {
                color: #f8fafc;
            }

            .mediflow-preloader-subtitle {
                font-family: inherit;
                font-size: 0.6875rem;
                font-weight: 600;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                color: #64748b;
            }

            html.dark .mediflow-preloader-subtitle {
                color: #94a3b8;
            }
        </style>

        <link rel="icon" href="/favicon.svg" type="image/svg+xml">

        <!-- LDRS Cardio Web Component for Healthcare Preloader -->
        <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/cardio.js"></script>

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'MediFlow') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <!-- Initial Healthcare Cardio Preloader (Only shown on first request / hard reload) -->
        <div id="mediflow-preloader" class="mediflow-preloader">
            <div class="mediflow-preloader-content">
                <l-cardio
                    size="64"
                    stroke="4.5"
                    speed="1.6"
                    color="#0d9488"
                ></l-cardio>
                <div class="mediflow-preloader-text">
                    <span class="mediflow-preloader-brand">MediFlow</span>
                    <span class="mediflow-preloader-subtitle">CLINIC OPERATIONS PLATFORM</span>
                </div>
            </div>
        </div>

        <script>
            (function() {
                const preloader = document.getElementById('mediflow-preloader');
                if (!preloader) return;

                const minShowTime = 1200; // Show for at least 1.2s to showcase the cardio heartbeat
                const startTime = performance.now();

                function removePreloader() {
                    const elapsed = performance.now() - startTime;
                    const remaining = Math.max(0, minShowTime - elapsed);

                    setTimeout(() => {
                        preloader.classList.add('fade-out');
                        setTimeout(() => {
                            if (preloader && preloader.parentNode) {
                                preloader.remove();
                            }
                        }, 600);
                    }, remaining);
                }

                if (document.readyState === 'complete') {
                    removePreloader();
                } else {
                    window.addEventListener('load', removePreloader);
                }
            })();
        </script>

        <x-inertia::app />
    </body>
</html>
