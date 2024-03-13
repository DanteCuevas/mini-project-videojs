<script setup>
import { onMounted } from "vue";
import { useVideo } from "@/stores/video";
 
const store = useVideo();
 
onMounted(store.getData);
</script>

<style>
.sample-text {
    font-family: 'BergenMono-Bold', sans-serif;
}

.loader-dots div {
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-dots div:nth-child(1) {
    left: 8px;
    animation: loader-dots1 0.6s infinite;
}
.loader-dots div:nth-child(2) {
    left: 8px;
    animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(3) {
    left: 32px;
    animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(4) {
    left: 56px;
    animation: loader-dots3 0.6s infinite;
}
@keyframes loader-dots1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes loader-dots3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes loader-dots2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
}
</style>

<template>
	<form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-lg mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Checkpoint 1</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="video-link">
						Link
					</label>
					<input
						v-model="store.form.link"
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="video-link"
						type="text"
						placeholder="https://..."
					/>
					<ValidationError :errors="store.errors" field="card_number" />
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Current Link
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">{{store.dataVideo.value.link}}</p>
				</div>

				<div class="border-t h-[1px] my-6"></div>

				<div class="flex flex-col gap-2">
					<button type="submit" class="btn btn-primary" :disabled="store.loading">
						<IconSpinner v-show="store.loading" />
						Add Link
					</button>
				</div>
			</div>
		</div>
	</form>

	<div class="border-t h-[1px] my-6"></div>

	<form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-lg mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Checkpoint 2</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Duration in seconds
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">{{store.dataVideo.value.duration}}</p>
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Pixels tall of video
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">{{store.dataVideo.value.height}}</p>
				</div>

			</div>
		</div>
	</form>

	<div class="border-t h-[1px] my-6"></div>

	<form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-lg mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Checkpoint 3</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Listen audio from 0:30 to 0:45
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						<audio :src="store.dataVideo.value.audio" controls="controls"  preload="none"></audio>
					</p>
				</div>

				
				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Download the audio
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						<button
							class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							v-on:click="store.clickDownload('download-audio')"
							:disabled="store.loading">
							<IconSpinner v-show="store.loading" />
							Download
						</button>
						<a
							id="download-audio"
							href="http://ec2-54-167-70-89.compute-1.amazonaws.com:3001/api/video/download?type=audio"
							style=" display: none;"
							download
						>
						Download
						</a>
					</p>
				</div>

			</div>
		</div>
	</form>

	<div class="border-t h-[1px] my-6"></div>

	<form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-lg mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Checkpoint 4</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Translate to ES audio from 0:30 to 0:45
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						{{store.dataVideo.value.textES}}
					</p>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						<button v-if="!store.dataVideo.value.textES"
                			class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                			type="button"
                			v-on:click="store.getTranscript"
              			>
							Run Translate
						</button>
					</p>
				</div>

			</div>
		</div>
	</form>

	<div class="border-t h-[1px] my-6"></div>

	<form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-lg mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Checkpoint 5</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Listen audio from 0:30 to 0:45 to ES
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						<audio v-if="store.dataVideo.value.textES" :src="store.dataVideo.value.audioES" controls="controls"  preload="none"></audio>
					</p>
					<div v-if="store.dataVideo.value">
						<p class="text-purple-700 text-opacity-100" v-if="!store.dataVideo.value.textES">
							Need to run Translate in checkpoint 4
						</p>
					</div>
				</div>

			</div>
		</div>
	</form>

	<div class="border-t h-[1px] my-6"></div>

	<form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-lg mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Checkpoint 6</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						First frame of the video
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						<img :src="store.dataVideo.value.image" :alt="store.dataVideo.value._id"/>
					</p>
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Download the image
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						<button
							class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							v-on:click="store.clickDownload('download-img')"
							:disabled="store.loading">
							<IconSpinner v-show="store.loading" />
							Download
						</button>
						<a
							id="download-img"
							href="http://ec2-54-167-70-89.compute-1.amazonaws.com:3001/api/video/download?type=img"
							style=" display: none;"
							download
						>
						Download
						</a>
					</p>
				</div>

			</div>
		</div>
	</form>

	<div class="border-t h-[1px] my-6"></div>

	<form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-lg mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Checkpoint 7</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						Run OCR on the image
					</label>
					<p class="text-purple-700 text-opacity-100" v-if="store.dataVideo.value">
						<button
                			class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                			type="button"
                			v-on:click="store.runOCR()"
              			>
							Run OCR
						</button>
					</p>
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="current-link">
						List all detected words/phrases in a monospaced font
					</label>
					<p class="text-purple-700 text-opacity-100 font-mono" v-if="store.dataVideo.value" style="font-size: xx-large;">
						{{store.textOCR}}
					</p>
				</div>

			</div>
		</div>
	</form>
	
	<div class="border-t h-[1px] my-6"></div>

	
	<div v-if="!store.isHidden" class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style="background: rgba(0, 0, 0, 0.3);">
		<div class="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
			<div class="loader-dots block relative w-20 h-5 mt-2">
				<div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
				<div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
				<div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
				<div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
			</div>
			<div class="text-gray-500 text-xs font-medium mt-2 text-center">
			Processing...
			</div>
		</div>
	</div>
  
</template>