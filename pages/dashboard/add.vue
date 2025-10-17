<template>
  <div class="container max-w-md mx-auto mt-9">
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
        <FloatLabel variant="in">
          <InputNumber
            name="lat"
            v-model="form.lat"
            :disabled="isSubmitting"
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="6"
            fluid
          />
          <label for="lat">Latitude</label>
        </FloatLabel>
        <Message
          v-if="$form.lat?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.lat.error?.message }}</Message
        >
      </div>

      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <InputNumber
            name="long"
            v-model="form.long"
            :disabled="isSubmitting"
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="6"
            fluid
          />
          <label for="long">Longitude</label>
        </FloatLabel>
        <Message
          v-if="$form.long?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.long.error?.message }}</Message
        >
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
  </div>
</template>

<script setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
const { addLocation } = useLocations();
const toast = useToast();
const router = useRouter();

// Form
const isSubmitting = ref(false);

const form = ref({
  name: "",
  description: "",
  lat: "",
  long: "",
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

const onFormSubmit = async ({ valid, values }) => {
  isSubmitting.value = true;
  try {
    if (valid) {
      const res = await addLocation(values);
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
    name: form.value.name,
    description: form.value.description,
    lat: form.value.lat,
    long: form.value.long,
  };
};

const currentFormData = computed(() => {
  return JSON.stringify(buildFormSnapshot());
});

const formHasChanges = computed(
  () => currentFormData.value !== initialFormData.value
);

onMounted(async () => {
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
  } else {
    return true;
  }
});
</script>
