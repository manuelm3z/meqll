var button = document.getElementById('refresh'), container = document.getElementById('container');

button.addEventListener('click', refresh);

function refresh(event) {
	event.preventDefault();

	if (fetch) {
		container.classList.add("loading");

		fetch('/api')
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				var wrapper;

				if (json.link) {
					wrapper = document.createElement('A');
					
					wrapper.href = json.link;

					wrapper.target = '_blank';

					wrapper.style.color = '#333';

					var h1 = document.createElement('H1');

					h1.innerText = json.text;

					wrapper.appendChild(h1);
				} else {
					wrapper = document.createElement('H1');

					wrapper.innerText = json.text;
				}

				var item = container.childNodes[0];

				container.replaceChild(wrapper, item);

				container.classList.remove("loading");
			});
	}
}