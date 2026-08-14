<?php

$dir = __DIR__ . '/app/Models';
$files = scandir($dir);

foreach ($files as $file) {
    if (!str_ends_with($file, '.php')) continue;
    if ($file === 'User.php') continue;

    $path = $dir . '/' . $file;
    $content = file_get_contents($path);
    
    if (str_contains($file, 'CoupleSetting')) {
        $replacement = <<<PHP
    protected \$primaryKey = 'id';
    public \$incrementing = false;
    protected \$keyType = 'string';
    protected \$guarded = [];
PHP;
        $content = str_replace('//', $replacement, $content);
    } else {
        $replacement = <<<PHP
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class $1 extends Model
{
    use HasUuids;

    protected \$guarded = [];
PHP;
        $content = preg_replace('/class\s+([A-Za-z0-9_]+)\s+extends\s+Model\s*\{/', $replacement, $content);
    }
    
    file_put_contents($path, $content);
    echo "Updated $file\n";
}
