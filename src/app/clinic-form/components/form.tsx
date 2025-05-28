"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { CreateClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const clinicFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

type ClinicFormValues = z.infer<typeof clinicFormSchema>;

const ClinicForm = () => {
  const form = useForm<ClinicFormValues>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: ClinicFormValues) => {
    try {
      await CreateClinic(data.name);
      toast.success("Clínica criada com sucesso!");
      form.reset();
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.error("Erro ao criar clínica:", error);
      toast.error("Erro ao criar clínica. Tente novamente.");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome da clínica" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              "Criar clínica"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ClinicForm;
