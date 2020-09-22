function ValidaCPF() {

    let ao_cpf = document.forms.form1.ao_cpf.value;
    if (ao_cpf.match(/\d/g).join('').length === 11) {
        console.log('cpf invalido.');
        return;
    }
    let cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
    if (cpfValido.test(ao_cpf) == false) {
        //alert("invalido");
        let formattedCpf = ao_cpf.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4');
        let valorValido = document.getElementById("ao_cpf").value = formattedCpf;
    }
}
// filtro da pesquisa
function myFunction() {
    let input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];

        if (td) {
            txtValue = td.textContent || td.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}