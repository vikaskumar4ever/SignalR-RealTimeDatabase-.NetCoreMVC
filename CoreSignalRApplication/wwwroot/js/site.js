
$(() => {

    LoadProdData();

    var connection = new signalR.HubConnectionBuilder().withUrl("/signalrServer").build();
    connection.start();
    connection.on("LoadProducts", function () {
        LoadProdData();
    })

    function LoadProdData() {
        debugger;
        var tr = '';
        $.ajax({
            url: '/Products/GetProducts',
            method: 'GET',
            success: (result) => {
                $.each(result, (k, v) => {
                    tr += `<tr>
                        <td>${v.ProdName}</td>
                        <td>${v.Category}</td>
                        <td>${v.UnitPrice}</td>
                        <td>${v.StockQty}</td>
                        <td>
                        <a href='../Products/Edit?id=${v.ProdId}'>Update</a>
                        <a href='../Products/Details?id=${v.ProdId}'>View</a>
                        <a href='../Products/Delete?id=${v.ProdId}'>Delete</a>
                        </td>
                    </tr>`
                })
                $("#tableBody").html(tr);
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

})