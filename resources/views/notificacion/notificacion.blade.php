@component('mail::message')
# Mensaje 

Hemos recibido un mensaje con los siguientes datos
<br>
Nombre: {{$notificacion->nombre}}<br>
Correo: {{$notificacion->email}}<br>
Telefono: {{$notificacion->telefono}}<br>
Mensaje: {{$notificacion->mensaje}}<br>

{{ config('app.name') }}
@endcomponent