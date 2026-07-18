<x-mail::message>
<div style="margin-bottom: 24px; text-align: center;">
    <div style="display: inline-flex; align-items: center; gap: 10px; border-radius: 999px; background: #ecfeff; color: #0f766e; padding: 10px 16px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;">
        MediFlow
    </div>
</div>

@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# @lang('Whoops!')
@else
# @lang('Hello!')
@endif
@endif

@foreach ($introLines as $line)
{{ $line }}

@endforeach

@isset($actionText)
<?php
    $color = match ($level) {
        'success', 'error' => $level,
        default => 'primary',
    };
?>
<x-mail::button :url="$actionUrl" :color="$color">
{{ $actionText }}
</x-mail::button>
@endisset

@foreach ($outroLines as $line)
{{ $line }}

@endforeach

@if (! empty($salutation))
{{ $salutation }}
@else
@lang('Regards,')<br>
{{ config('app.name') }}
@endif

@isset($actionText)
<x-slot:subcopy>
@lang(
    "If you're having trouble clicking the \":actionText\" button, copy and paste the URL below\n".
    'into your web browser:',
    [
        'actionText' => $actionText,
    ]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
</x-slot:subcopy>
@endisset

<p style="margin-top: 24px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.6;">
    MediFlow sends verification links, password resets, and clinic notifications with a consistent branded experience.
</p>
</x-mail::message>
