<?php

function field($title, $name, $id, $type = "text", $additional = '') {
    echo "
        <div class='field'>
            <label for='$id'>$title</label>
            <input
                type='$type'
                name='$name'
                id='$id'
                autocomplete='off'
                required
                $additional
            />
        </div>
    ";
}