<template>
  <div class="container max-w-md mx-auto mt-9 px-4 space-y-4">
    <div class="flex flex-col gap-4">
      <h1 class="text-xl font-medium">Add Location</h1>

      <p>
        A location is a place you have traveled or will travel to. It can be a
        country, state, city or point of interest. You can add specific times
        you visited this location after adding it.
      </p>
    </div>

    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="form"
      @submit="onFormSubmit"
      class="flex flex-col mt-8 gap-4 w-full"
    >
      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <InputText
            name="name"
            type="text"
            v-model="form.name"
            :disabled="isSubmitting"
            fluid
          />
          <label for="name">Name</label>
        </FloatLabel>
        <Message
          v-if="$form.name?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.name.error?.message }}</Message
        >
      </div>

      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <Textarea
            name="description"
            type="textarea"
            v-model="form.description"
            :disabled="isSubmitting"
            rows="5"
            cols="30"
            fluid
          />
          <label for="description">Description</label>
        </FloatLabel>
        <Message
          v-if="$form.description?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.description.error?.message }}</Message
        >
      </div>

      <div class="flex flex-col gap-1">
        <p class="text-xs text-neutral-500">
          Current coordinates: [{{ form.lat }}, {{ form.long }}]
        </p>

        <p class="text-sm">
          Drag the
          <Icon
            name="tabler:map-pin-filled"
            size="20"
            class="text-orange-400 mb-2"
          />
          marker to your desired location, click on the map or search a location
          below.
        </p>
      </div>

      <div class="flex items-center justify-end gap-4">
        <Button
          variant="outlined"
          severity="secondary"
          label="Cancel"
          :loading="isSubmitting"
          loading-icon="pi pi-spinner-dotted pi-spin"
          @click="router.back()"
        >
          <template #icon>
            <Icon name="tabler:arrow-left" size="24" />
          </template>
        </Button>

        <Button
          type="submit"
          severity="primary"
          label="Add"
          :loading="isSubmitting"
          loading-icon="pi pi-spinner-dotted pi-spin"
        >
          <template #icon>
            <Icon name="tabler:circle-plus" size="24" />
          </template>
        </Button>
      </div>
    </Form>

    <PlaceSearch @SetLocation="setSelectedLocation" />
  </div>
</template>

<script lang="ts" setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
const { addLocation } = useLocations();
const toast = useToast();
const router = useRouter();
const mapStore = useMapStore();

// Form
const isSubmitting = ref(false);

const form = ref<{
  name: String | undefined;
  description: String | undefined;
  lat: Number | undefined;
  long: Number | undefined;
}>({
  name: "",
  description: "",
  lat: undefined,
  long: undefined,
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(1, { message: "Name is required." }),
      description: z
        .string()
        .min(1, { message: "Description is required." })
        .max(1000, {
          message: "Descriptions cannot be longer than 1000 characters",
        }),
      lat: z.number("Latitude is required").min(-90).max(90),
      long: z.number("Longitude is required").min(-180).max(180),
    })
  )
);

const setSelectedLocation = (selectedLocation) => {
  mapStore.draggablePoint = {
    id: selectedLocation.place_id,
    name: selectedLocation.display_name,
    description: "Selected location",
    lat: selectedLocation.lat,
    long: selectedLocation.lon,
    centerMap: true,
  };

  (form.value.name = selectedLocation.display_name),
    (form.value.description = "");
};

const onFormSubmit = async ({ valid }) => {
  isSubmitting.value = true;
  try {
    if (valid) {
      const res = await addLocation(form.value);
      console.log("res", res);

      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Location added successfully",
        life: 5000,
      });

      // Reset form state
      initialFormData.value = JSON.stringify(buildFormSnapshot());

      // Send user back to Dashboard
      navigateTo("/dashboard");
    }
  } catch (error) {
    console.log("ERROR", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 5000,
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Track if form have changes
const initialFormData = ref("");

const buildFormSnapshot = () => {
  return {
    name: form.value?.name,
    description: form.value?.description,
    lat: form.value?.lat,
    long: form.value?.long,
  };
};

const currentFormData = computed(() => {
  return JSON.stringify(buildFormSnapshot());
});

const formHasChanges = computed(
  () => currentFormData.value !== initialFormData.value
);

//Update coordinates on drag
effect(() => {
  if (mapStore.draggablePoint) {
    (form.value.lat = mapStore.draggablePoint.lat),
      (form.value.long = mapStore.draggablePoint.long);
  }
});

onMounted(async () => {
  mapStore.draggablePoint = {
    id: 1,
    name: "Draggable Point",
    description: "Draggable point",
    lat: -27.998269,
    long: 153.414304,
  };

  form.value.lat = mapStore.draggablePoint.lat;
  form.value.long = mapStore.draggablePoint.long;

  initialFormData.value = JSON.stringify(buildFormSnapshot());
});

onBeforeRouteLeave(() => {
  if (formHasChanges.value) {
    const confirm = window.confirm(
      "Are you sure you want to leave? Any unsaved data will be lost!"
    );

    if (!confirm) {
      return false;
    }
  }
  mapStore.draggablePoint = null;
  return true;
});
</script>
