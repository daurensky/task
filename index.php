<?php

date_default_timezone_set('Asia/Almaty');

$COMPONENTS_DIR = './components';

require_once "$COMPONENTS_DIR/header.php";
require_once "$COMPONENTS_DIR/field.php";

$loading_img = 'https://i.imgur.com/llF5iyg.gif';

?>

<h1 class="title">Добавить пользователя</h1>
<div class="container">
    <div class="add-user-container">
        <div class="add-user-photo-preview-container">
            <label class="add-user-photo-preview" for="photo">Загрузить фото</label>
            <button class="btn add-user-photo-reset hidden">Убрать фото</button>
        </div>
        <form class="add-user-form" enctype="multipart/form-data">
            <?php
                field('ФИО', 'name', 'name');
                field('Дата рождения', 'birthday', 'birthday', 'date');
                field(
                    'ИИН',
                    'uin',
                    'uin',
                    'text',
                    '
                        pattern="\d{12,12}"
                        maxlength="12"
                        title="ИИН должен состоять только из 12 цифр"
                    '
                );
                field('Номер телефона', 'phone', 'phone', 'tel');
                field('Адрес', 'adress', 'adress');
            ?>
            <input type="file" name="photo" id="photo" style="display: none" />
            <button class="btn btn-accept add-user-btn">Добавить</button>
        </form>
    </div>

    <table class="user-list-container" cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <th>Фото</th>
                <th>ФИО</th>
                <th>Дата рождения</th>
                <th>ИИН</th>
                <th>Номер телефона</th>
                <th>Адрес</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <tr class="user-row">
                <td>1</td>
                <td class="user-row-photo-container">
                    <div
                        class="user-row-photo"
                        style="background-image: url(<?= $loading_img ?>)"
                    ></div>
                </td>
                <td>Загрузка</td>
            </tr>
        </tbody>
    </table>
</div>
        
<?php require_once "$COMPONENTS_DIR/footer.php"; ?>