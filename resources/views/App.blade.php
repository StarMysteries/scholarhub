<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ScholarHub</title>
    @viteReactRefresh {{-- Required for React fast refresh during development --}}
    @vite('resources/css/app.css')
    @vite('resources/js/app.jsx')
</head>
<body>
    <div id="root"></div> {{-- React will mount the App component here --}}
</body>
</html>