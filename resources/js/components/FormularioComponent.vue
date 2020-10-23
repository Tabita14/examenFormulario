<template>
	<div class="card shadow">
		<div class="card-header"> <h3 class="h3">Ingresa la siguiente información</h3> </div>
		<div class="card-body">
			<form
				class="needs-validation"
				novalidate
				v-bind:class="{ 'was-validated': isValid }"
				@submit.prevent="newMessage()"
			>
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text" id="nombre"
							><i class="fas fa-user-ninja"></i
						></span>
					</div>
					<input
						v-model="nombre"
						type="text"
						class="form-control"
						name="nombre"
						id="nombre"
						required
						placeholder="Nombre *"
					/>
					<div class="invalid-feedback">Campo requerido</div>
				</div>
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text" id="telefono"
							><i class="fas fa-phone-alt"></i>
						</span>
					</div>
					<input
						v-model="telefono"
						type="tel"
						v-mask="'(###)-###-####'"
						class="form-control"
						name="telefono"
						id="telefono"
						required
						placeholder="Teléfono *"
					/>
					<div class="invalid-feedback">Campo requerido</div>
				</div>

				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text" id="email"
							><i class="fas fa-envelope"></i>
						</span>
					</div>
					<input
						v-model="email"
						type="email"
						class="form-control"
						name="email"
						id="email"
						required
						placeholder="Email *"
					/>
					<div class="invalid-feedback">{{ errorMsg }}</div>
				</div>
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text"
							><i class="fas fa-edit"></i
						></span>
					</div>
					<textarea
						v-model="mensaje"
						class="form-control"
						id="mensaje"
						rows="3"
						required
					></textarea>
					<div class="invalid-feedback">Campo requerido</div>
				</div>
				<button :disabled="btnDisabled == true"  type="submit" class="btn btn-primary btn-lg btn-block">
					Enviar <i class="fas fa-paper-plane"></i>
				</button>
			</form>
		</div>
	</div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
	directives: { mask },
	data() {
		return {
			nombre: "",
			telefono: "",
			email: "",
			mensaje: "",
			isValid: false,
			btnDisabled: false,
			errorMsg: 'Campo requerido',
		};
	},
	mounted() {
		console.log("Examen programador");
	},
	methods: {
		newMessage() {

			if (this.email && !this.validEmail(this.email)){
				this.errorMsg = 'Email Invalido'
			}
			
			this.isValid = !(
				this.nombre &&
				this.telefono &&
				this.email &&
				this.mensaje && 
				this.validEmail(this.email)
			);

			if (this.isValid) {
				return;
			}

			this.btnDisabled = true;
			const params = {
				nombre: this.nombre,
				telefono: this.telefono,
				email: this.email,
				mensaje: this.mensaje,
			};

			axios
				.post("/mensaje", params)
				.then((response) => {
					this.$swal("Hemos enviado tu mensaje", "", "success");
					this.btnDisabled = false;
					this.nombre = "";
					this.telefono = "";
					this.email = "";
					this.mensaje = "";
				})
				.catch((error) => {
					this.$swal({
						icon: "error",
						title: "Oops...",
						text: "Algo salió mal, intenta de nuevo",
					});
					this.btnDisabled = false;
				});
		},
		validEmail: function (email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	},
};
</script>
