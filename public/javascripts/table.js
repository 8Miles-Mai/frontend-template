/**
 * Created by miles on 16/3/22.
 */
window.onload = function() {
    var scripts = [
            location.search.substring(1) || '/bootstrap-table/js/bootstrap-table.min.js',
            '/bootstrap-table/js/bootstrap-table-zh-CN.min.js'
        ],
        stylesheets = ['/bootstrap-table/css/bootstrap-table.css'];

    eachSeries(scripts, getScript, initTable);
    eachSeries(stylesheets, getStylesheet, null);

    var $table = $('#table');

    var $data = [{
        id: 1,
        name: 'Item 1',
        price: '$1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '$2'
    }];

    function initTable() {
        $table.bootstrapTable({
            columns: [{
                field: 'id',
                title: 'Item ID',
                valign: 'middle',
                align: 'center'
            }, {
                field: 'name',
                title: 'Item Name',
                editable: true,
                valign: 'middle',
                align: 'center'
            }, {
                field: 'price',
                title: 'Item Price',
                editable: true,
                valign: 'middle',
                align: 'center'
            }, {
                field: 'operation',
                title: 'Op',
                valign: 'middle',
                align: 'center',
                events: 'operateEvents',
                formatter: operateFormatter
            }],
            data: $data
        });
    }


    function operateFormatter(value, row, index) {
        return [
            '<a class="like" href="javascript:void(0)" title="Like">',
            '<i class="glyphicon glyphicon-heart"></i>',
            '</a>  ',
            '<a class="remove" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    }

    window.operateEvents = {
        'click .like': function (e, value, row, index) {
            console.log('You click like action, row: ' + JSON.stringify(row));
        },
        'click .remove': function (e, value, row, index) {
            $table.bootstrapTable('remove', {
                field: 'id',
                values: [row.id]
            });
        }
    };
};

