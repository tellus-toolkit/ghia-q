<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>jQuery UI Sortable - Default functionality</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <style>
        #sortable {
            list-style-type: none;
            margin: 0;
            padding: 0;
            width: 60%;
        }

        #sortable li {
            margin: 0 3px 3px 3px;
            padding: 0.4em;
            padding-left: 1.5em;
            font-size: 1.4em;
            height: 18px;
        }

        #sortable li span {
            position: absolute;
            margin-left: -1.3em;
        }

        #save-reorder {
            padding: 10px;
            background: #12a574;
            color: #fff;
        }

        .wrapper {
            width: 60%;
            margin: 0 auto;
        }
    </style>
    <script>
        $(function () {
            $("#sortable").sortable();
            $("#sortable").disableSelection();
        });
    </script>
</head>
<body>
<?php require_once('function.php'); ?>
<div class="wrapper">
    <ul id="sortable">
        Sort the list
        <?php $data = get_records(); ?>
        <?php foreach ($data as $record): ?>
            <li data-id="<?php echo $record['id']; ?>" class="ui-state-default"><span
                        class="ui-icon ui-icon-arrowthick-2-n-s"></span><?php echo $record['name']; ?></li>
        <?php endforeach; ?>
    </ul>
    <button id="save-reorder">Save</button>
</div>
<script>
    $(document).ready(function () {
        $(document).on('click', '#save-reorder', function () {
            var list = new Array();
            $('#sortable').find('.ui-state-default').each(function () {
                var id = $(this).attr('data-id');
                list.push(id);
            });
            var data = JSON.stringify(list);
            $.ajax({
                url: 'save.php', // server url
                type: 'POST', //POST or GET
                data: {token: 'reorder', data: data}, // data to send in ajax format or querystring format
                datatype: 'json',
                success: function (message) {
                    alert(message);
                }
            });
        });
    });
</script>
</body>
</html>
