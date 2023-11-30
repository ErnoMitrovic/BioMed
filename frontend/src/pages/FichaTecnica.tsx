import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Button,
    HStack,
    Heading,
    useBreakpointValue,
    Grid,
    GridItem,
    Radio,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import React from 'react';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Borrow,
    createBorrow,
} from '../models/borrowFront';
import {
    Equipment,
    getEquipments,
    getEquipmentByPattern,
    updateEquipment,
    createEquipment,
    deleteEquipment
} from '../models/equipmentFront';

interface Item {
    label: string;
    value: string;
}

var equipos = [
    'Aparato de anestesia',
    'Aparato de radiografia',
    'Aparato de electrocardiograma',
];

interface FormData {
    nombreDelEquipo: string;
    marca: string;
    fechaDeRecepcion: string;
    nombreDelRepartidor: string;
    numeroDeFichaTecnica: string;
    nombreDelReceptor: string;
    accesorios: string;
    capacitacion: string;
    consumibles: string;
    garantia: string;
    refracciones: string;
    mantenimiento: string;
    instalacion: string;
    normas: string;
}

type FormField = {
    id: keyof FormData;
    label: string;
    placeholder: string;
    required: boolean;
    type?: string;
    options?: string[];
    showOnValue?: string;
    hidden?: boolean;
};

const formFields: FormField[] = [
    { id: 'nombreDelEquipo', label: 'Nombre del equipo', placeholder: 'Lista desplegable', required: true, type: 'autocomplete', options: equipos },
    { id: 'marca', label: 'Marca', placeholder: 'Ingresa una marca', required: true, type: 'text' },
    { id: 'fechaDeRecepcion', label: 'Fecha de recepción', placeholder: '', required: true, type: 'date' },
    { id: 'nombreDelRepartidor', label: 'Nombre del repartidor', placeholder: 'Nombre y apellido', required: true, type: 'text' },
    { id: 'numeroDeFichaTecnica', label: 'Número de ficha técnica', placeholder: 'XXXXXXXX', required: true, type: 'text' },
    { id: 'nombreDelReceptor', label: 'Nombre del receptor', placeholder: 'Nombre y apellido', required: true, type: 'text' },
    { id: 'accesorios', label: 'Accesorios', placeholder: 'Accesorios del equipo', required: true, type: 'text' },
    { id: 'capacitacion', label: 'Capacitación', placeholder: 'Quien brinda la capacitacion', required: true, type: 'text' },
    { id: 'consumibles', label: 'Consumibles', placeholder: 'Consumibles del equipo', required: true, type: 'text' },
    { id: 'garantia', label: 'Garantia', placeholder: 'Garantia del equipo', required: true, type: 'text' },
    { id: 'mantenimiento', label: 'Mantenimiento', placeholder: 'Periodo de mantenimiento en meses', required: true, type: 'text' },
    { id: 'instalacion', label: 'Instalacion y puesta en marcha', placeholder: 'Instrucciones', required: true, type: 'text' },
    { id: 'normas', label: 'Normas y certificados vigentes', placeholder: 'Certificado / norma', required: true, type: 'text' },
];

const initialFormData: FormData = {
    nombreDelEquipo: '',
    marca: '',
    fechaDeRecepcion: '',
    nombreDelRepartidor: '',
    numeroDeFichaTecnica: '',
    nombreDelReceptor: '',
    accesorios: '',
    capacitacion: '',
    consumibles: '',
    garantia: '',
    refracciones: '',
    mantenimiento: '',
    instalacion: '',
    normas: '',
};

function FichaTecnica() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [wasInDB, setWasInDB] = React.useState(false);
    const [pickerItems, setPickerItems] = React.useState(equipos);
    const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
    const [formData, setFormData] = React.useState(initialFormData);
    const templateValues = useBreakpointValue({
        base: 'repeat(1, 1fr)', // 1 columna en dispositivos pequeños
        md: 'repeat(2, 1fr)', // 2 columnas en dispositivos medianos
        lg: 'repeat(3, 1fr)', // 3 columnas en dispositivos grandes
    });


    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        // Delete current equipment
        deleteEquipment(formData.numeroDeFichaTecnica).then(() => {
            toast.success('Se ha eliminado la ficha técnica');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
        setIsDialogOpen(false);

    };

    const handleCreateItem = (item: Item) => {
        setPickerItems((curr) => [...curr, item.value]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (changes: { selectedItems?: Item[] }) => {
        // Obtener los datos del equipo seleccionado
        if (changes.selectedItems) {
            setSelectedItems(changes.selectedItems);
            if (changes.selectedItems[0] === undefined) return;
            if (changes.selectedItems.length > 1) changes.selectedItems.splice(0, 1);
            getEquipmentByPattern(changes.selectedItems[0].label).then((equipment: Equipment[]) => {
                if (equipment.length === 0) {
                    setFormData(initialFormData);
                    setWasInDB(false);
                    return;
                }
                setFormData({
                    ...formData,
                    nombreDelEquipo: equipment[0].name,
                    numeroDeFichaTecnica: equipment[0].id || '',
                    marca: equipment[0].brand,
                    accesorios: equipment[0].accessories,
                    capacitacion: equipment[0].training,
                    consumibles: equipment[0].consumables,
                    garantia: equipment[0].warranty,
                    refracciones: equipment[0].spare_parts,
                    mantenimiento: equipment[0].maintenance,
                    instalacion: equipment[0].installation,
                    normas: equipment[0].norms,
                });
                setWasInDB(true);
            });
        }
    };

    // If the value of the autocomplete changes, update the form data
    React.useEffect(() => {
        getEquipments().then((equipments: Equipment[]) => {
            setPickerItems(equipments.map((equipment) => equipment.name));
        });
    }, []);

    const handleChange = (id: keyof FormData, value: string) => {
        setFormData({
            ...formData,
            [id]: value,
        });
    };



    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (wasInDB) {
            const equipment: Equipment = {
                id: formData.numeroDeFichaTecnica,
                name: formData.nombreDelEquipo,
                brand: formData.marca,
                accessories: formData.accesorios,
                training: formData.capacitacion,
                consumables: formData.consumibles,
                warranty: formData.garantia,
                spare_parts: formData.refracciones,
                maintenance: formData.mantenimiento,
                installation: formData.instalacion,
                norms: formData.normas,
            };

            const splitDistributorName = formData.nombreDelRepartidor.split(' ');
            const splitReceiverName = formData.nombreDelReceptor.split(' ');

            const borrow: Borrow = {
                equipment_id: formData.numeroDeFichaTecnica,
                distributor_name: splitDistributorName[0],
                receiver_name: splitReceiverName[0],
                receiving_date: formData.fechaDeRecepcion,
                receiver_lastname: splitReceiverName.slice(1).join(' '),
                distributor_lastname: splitDistributorName.slice(1).join(' '),
            };
            updateEquipment(equipment)
            createBorrow(borrow)
                .then(() => {
                    toast.success('Se ha actualizado la ficha técnica');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(() => {
                    toast.error('No se pudo actualizar la ficha técnica');
                });
        } else {
            const equipment: Equipment = {
                id: formData.numeroDeFichaTecnica,
                name: formData.nombreDelEquipo,
                brand: formData.marca,
                accessories: formData.accesorios,
                training: formData.capacitacion,
                consumables: formData.consumibles,
                warranty: formData.garantia,
                spare_parts: formData.refracciones,
                maintenance: formData.mantenimiento,
                installation: formData.instalacion,
                norms: formData.normas,
            };

            const splitDistributorName = formData.nombreDelRepartidor.split(' ');
            const splitReceiverName = formData.nombreDelReceptor.split(' ');

            const borrow: Borrow = {
                equipment_id: formData.numeroDeFichaTecnica,
                distributor_name: splitDistributorName[0],
                receiver_name: splitReceiverName[0],
                receiving_date: formData.fechaDeRecepcion,
                receiver_lastname: splitReceiverName.slice(1).join(' '),
                distributor_lastname: splitDistributorName.slice(1).join(' '),
            };
            createEquipment(equipment)
            createBorrow(borrow)
                .then(() => {
                    toast.success('Se ha creado la ficha técnica');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(() => {
                    toast.error('No se pudo crear la ficha técnica');
                });
        }
    };

    const renderFormField = (field: FormField) => {
        switch (field.type) {
            case 'autocomplete':
                return (
                    <CUIAutoComplete
                        label={field.label}
                        labelStyleProps={{ color: '#8C587A', fontWeight: 'bold' }}
                        placeholder={field.placeholder}
                        onCreateItem={handleCreateItem}
                        createItemRenderer={(inputValue) => `Crear "${inputValue}"`}
                        items={pickerItems.map((item) => ({ label: item, value: item }))} // Convertir el arreglo de strings a un arreglo de objetos
                        selectedItems={selectedItems}
                        onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes)}
                    />
                );
            case 'text':
                return (
                    <FormControl>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <Input value={formData[field.id]} type='text' placeholder={field.placeholder} onChange={(e) => handleChange(field.id, e.target.value)} />
                    </FormControl>
                );
            case 'date':
                return (
                    <FormControl>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <Input value={formData[field.id]} type="date" onChange={(e) => handleChange(field.id, e.target.value)} />
                    </FormControl>
                );
            case 'number':
                return (
                    <FormControl>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <NumberInput defaultValue={0} min={0}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                )
            case 'radio':
                return (
                    <FormControl as='fieldset'>
                        <FormLabel color='#8C587A' fontWeight='bold'>{field.label}</FormLabel>
                        <RadioGroup defaultValue={field.options ? field.options[0] : ''}>
                            <HStack spacing='24px'>
                                {field.options &&
                                    field.options.map((option, index) => (
                                        <Radio key={index} value={option}>
                                            {option}
                                        </Radio>
                                    ))}
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                );
            default:
                return null;
        }
    };

    return (
        <Box w='100%' as='form' onSubmit={submit}>
            <ToastContainer />
            {/* Diálogo de confirmación */}
            <DeleteConfirmationDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
            />
            <Flex direction='column' align="center" justify="center" minW='sm'>
                <Grid templateColumns={templateValues} gap={4} autoRows="minmax(75px, auto)" p={4} w='80%'>
                    {formFields.slice(0, 6).map((field) => (
                        <GridItem key={field.id} colSpan={1}>
                            {renderFormField(field)}
                        </GridItem>
                    ))}
                </Grid>
                <Box bg='#8C587A' w='100%' color='white'>
                    <Heading p={4} fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>
                        Apartado de características
                    </Heading>
                </Box>
                <Grid templateColumns={templateValues} gap={4} autoRows="minmax(75px, auto)" p={4} w='80%'>
                    {formFields.slice(6).map((field) => (
                        <GridItem key={field.id} colSpan={1}>
                            {renderFormField(field)}
                        </GridItem>
                    ))}

                </Grid>
            </Flex>
            <HStack spacing='24px' mt={4} mb={4} ml={4} justifyContent='center'>
                <Button onClick={handleOpenDialog} color='white' bg='#d32f2f' _hover={{ bg: '#ed6c02', color: 'black' }} _active={{ bg: '#ff9800' }}>
                    Borrar
                </Button>
                <Button type='submit' color='white' bg='#8C587A' _hover={{ bg: '#A61B8F' }} _active={{ bg: '#6C1466' }}>
                    Enviar
                </Button>
            </HStack>
        </Box>
    );
}


export default FichaTecnica;
