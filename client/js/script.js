// ***** Const init *****
const ws = new WebSocket('ws://localhost:3000');

const invisibleClass = 'invisible';
const modal = document.getElementById('modal');
const btnShowModal = document.getElementById('btnShowModal');
const btnCancel = document.getElementById('btnCancel');
const btnSale = document.getElementById('btnSale');
const productId = document.getElementById('productId');
const amount = document.getElementById('amount');

// Config data chart
const dataChart = [0, 0, 0, 0];
const labelsChart = ['Zapatos', 'Camisas', 'Pantalones', 'Ropa interior'];
const data = {
  labels: labelsChart,
  datasets: [
    {
      label: '$ Sales',
      data: dataChart,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(155, 99, 132)',
        'rgb(55, 99, 132)',
        'rgb(5, 99, 132)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(155, 99, 132)',
        'rgb(55, 99, 132)',
        'rgb(5, 99, 132)'
      ]
    }
  ]
};
const configChart = {
  type: 'bar',
  data: data,
  options: {
    scales: { y: { beginAtZero: true } }
  }
};
// ***** Const end *****

// Functions
const toggleModal = (evt) => {
  evt.preventDefault();

  modalBackground.classList.toggle(invisibleClass);
  modal.classList.toggle(invisibleClass);
};

const getFormValues = (evt) => {
  evt.preventDefault();

  const formValues = {
    productId: parseInt(productId.value, 10),
    amount: parseInt(amount.value, 10) || 0
  };

  ws.send(JSON.stringify(formValues));
  toggleModal(evt);
};

// Initialize chart
const salesChart = new Chart(document.getElementById('myChart'), configChart);

// Initialize WebSocket
ws.onopen = () => console.log('ws is connected');

ws.onmessage = ({ data }) => {
  const parseData = JSON.parse(data);
  const { productId, amount } = parseData;

  const findByIndex = productId - 1;
  dataChart[findByIndex] += amount;

  salesChart.update();
};

ws.onerror = (evt) => console.error('error', evt);

// Event listeners
btnShowModal.addEventListener('click', toggleModal);
btnCancel.addEventListener('click', toggleModal);
btnSale.addEventListener('click', getFormValues);
